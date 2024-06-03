<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthPasswordRequest extends FormRequest
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
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ];
        return $rules;
    }
    public function messages(): array
    {
        return [
            'token.required' => 'O token é obrigatório.',
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'Email inválido.',
            'password.required' => 'A senha é obrigatória.',
            'password.min' => 'A senha é deve conter :min caracteres.',
        ];
    }
}
