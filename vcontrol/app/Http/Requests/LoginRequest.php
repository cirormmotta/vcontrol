<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
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
        $userId = $this->route("id");
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];
        return $rules;
    }
    public function messages(): array
    {
        return [
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'O email é inválido.',
            'password.required' => 'A senha é obrigatória.',
        ];
    }
}
