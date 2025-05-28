<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Teste de registro de usuário
     * 
     * @return void
     */
    public function test_user_can_register()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Maria',
            'email' => 'maria@teste.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['user', 'access_token', 'token_type', 'expires_in']);
    }

    /**
     * Teste de login de usuário
     * 
     * @return void
     */
    public function test_user_can_login()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Virginia',
            'email' => 'virginia@bet.com',
            'password' => 'cupom123',
            'password_confirmation' => 'cupom123',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'virginia@bet.com',
            'password' => 'cupom123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['access_token', 'token_type', 'expires_in']);
    }

    /**
     * Teste se o usuário pode renovar o token
     * 
     * @return void
     */
    public function test_user_can_refresh_token()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Pedro',
            'email' => 'pedro@test.com',
            'password' => 'teste123',
            'password_confirmation' => 'teste123',
        ]);

        $accessToken = $response->json('access_token');

        $responseRefresh = $this->postJson('/api/auth/refresh', [], ['Authorization' => "Bearer {$accessToken}"]);
        $responseRefresh->assertStatus(200)
            ->assertJsonStructure(['access_token', 'token_type', 'expires_in']);
    }

    /**
     * Testa se o usuário foi deslogado e não tem mais acesso a API
     * 
     * @return void
     */
    public function test_user_logout_and_not_has_access()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Pedro2',
            'email' => 'pedro2@test.com',
            'password' => 'teste1234',
            'password_confirmation' => 'teste1234',
        ]);

        $accessToken = $response->json('access_token');

        $responseLogout = $this->postJson('/api/auth/logout', [], ['Authorization' => "Bearer {$accessToken}"]);
        $responseLogout->assertStatus(200);

        $responseMe = $this->getJson('/api/auth/me', ['Authorization' => "Bearer {$accessToken}"]);
        $responseMe->assertStatus(401);
    }
}
