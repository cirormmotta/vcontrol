<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
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
            'name' => 'required',
            'email' => 'required|email|unique:users,email' . ($userId ? ',' . $userId : ''),
            'user_type_id' => 'required',
        ];
        if (!$userId) {
            $rules['password'] = 'required|min:8';
        }
        return $rules;
    }
    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'O email é inválido.',
            'email.unique' => 'O email já está sendo utilizado.',
            'password.required' => 'A senha é obrigatória.',
            'password.min' => 'A senha é deve conter :min caracteres.',
            'user_type_id.required' => 'O tipo é obrigatório.',
        ];
    }
}
