<?php

namespace Database\Factories;

use App\Models\Pet;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PetFactory extends Factory
{
    protected $model = Pet::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->name(),
            'species' => $this->faker->randomElement(['Dog', 'Cat', 'Rabbit', 'Bird']),
            'breed' => $this->faker->word(),
            'age' => $this->faker->numberBetween(1, 15),
            'description' => $this->faker->sentence(),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'vaccinations' => $this->faker->randomElements(
                ['Rabies', 'Parvovirus', 'Distemper', 'Leptospirosis'],
                $this->faker->numberBetween(0, 4)
            ),
            'allergies' => $this->faker->randomElements(
                ['Pollen', 'Dust', 'Chicken', 'Beef'],
                $this->faker->numberBetween(0, 3)
            ),
            'location' => $this->faker->address(),
            'images' => [$this->faker->imageUrl(), $this->faker->imageUrl()]
        ];
    }
}
