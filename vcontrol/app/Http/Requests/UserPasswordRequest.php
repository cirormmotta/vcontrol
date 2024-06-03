<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'password' => 'required|min:8|confirmed',
        ];
        return $rules;
    }
    public function messages(): array
    {
        return [
            'password.required' => 'A senha é obrigatória.',
            'password.min' => 'A senha é deve conter :min caracteres.',
        ];
    }
}
