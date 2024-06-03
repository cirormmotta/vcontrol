<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class VisitRequest extends FormRequest
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
        return [
            'visitors_id' => 'required',
            'residents_id' => 'required',
            'residences_id' => 'required',
            'type_visits_id' => 'required',
        ];
    }
    public function messages(): array
    {
        return [
            'visitors_id.required' => 'O visitante é obrigatório.',
            'residents_id.required' => 'O residente é obrigatório.',
            'residences_id.required' => 'A residência é obrigatória.',
            'type_visits_id.required' => 'O tipo de visita é obrigatório.',
        ];
    }
}
