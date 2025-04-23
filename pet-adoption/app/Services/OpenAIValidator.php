<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class OpenAIValidator
{
    public function isValidAnimalTerm(string $type, string $value): bool
    {
        $key = "valid_{$type}_" . strtolower(trim($value));

        return Cache::remember($key, now()->addDays(1), function () use ($type, $value) {
            $prompt = "Is '{$value}' a real and valid animal {$type}? Respond with only 'Yes' or 'No'.";

            $response = Http::withToken(env('OPENAI_API_KEY'))
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => 'gpt-3.5-turbo',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are an animal taxonomy expert.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'temperature' => 0,
                ]);

            if (!$response->successful()) {
                return false; // Or throw an exception
            }

            $content = strtolower($response['choices'][0]['message']['content']);
            return str_contains($content, 'yes');
        });
    }
}
