<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;

class UserPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function failedValidation(Validator $validator): HttpResponseException
    {
        throw new HttpResponseException(response()->json(['messages' => $validator->errors()], 422));
    }
    public function rules(): array
    {
        $rules = [
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
        ];
        return $rules;
    }
    public function messages(): array
    {
        return [
            'password.required' => 'A senha é obrigatória.',
            'password' => 'A senha deve conter pelo menos 1 caractere especial, 1 letra maiúscula e 1 número.',
            'password.min' => 'A senha é deve conter :min caracteres.',
            'password.confirmed' => 'As senhas são divergentes.',
        ];
    }
}
