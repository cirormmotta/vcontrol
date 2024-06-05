<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class VisitorRequest extends FormRequest
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
        $id = $this->route("id");
        $uniqueValidation = ('unique:visitors,cpf' . ($id ? ',' . $id : ''));
        return [
            'name' => 'required',
            'cpf' => ['required',$uniqueValidation, new \App\Rules\CPFRule],
            'phone' => 'required',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório.',
            'cpf.required' => 'O CPF é obrigatório.',
            'cpf.unique' => 'O CPF já está sendo utilizado.',
            'phone.required' => 'O telefone é obrigatório.',
        ];
    }
}
