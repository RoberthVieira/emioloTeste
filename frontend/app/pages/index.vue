<script setup>

    const loginWithGoogle = () => {
        window.location.href = 'http://localhost:3000/auth/google'
    };

</script>

<template>
    <main class="login-page">
        <section class="login-card">
            <div class="header">
                <h1>Bem-vindo</h1>
                <p>Faça login para continuar</p>
            </div>

            <button class="google-btn" @click="loginWithGoogle">
            <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
            />
                Entrar com Google
            </button>

            <small class="info">
                Usamos sua conta Google apenas para autenticação.
            </small>
        </section>
    </main>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

    *{
        margin: 0;
        padding: 0;
    }

    .login-page {
        font-family: 'Orbitron', sans-serif;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at center, #1b2735 0%, #090a0f 100%);
        color: #ffe81f; 
        position: relative;
    }

    .login-card {
        width: 100%;
        max-width: 420px;
        background: #ffffff;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        text-align: center;
    }

    .header h1 {
        font-size: 1.6rem;
        margin-bottom: 0.25rem;
    }

    .header p {
        font-size: 0.95rem;
        color: #555;
        margin-bottom: 2rem;
    }

    .google-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: 8px;
        border: 1px solid #ddd;
        background: #fff;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .google-btn:hover {
        background: #f5f5f5;
    }

    .google-btn img {
        width: 20px;
        height: 20px;
    }

    .info {
        display: block;
        margin-top: 1.5rem;
        font-size: 0.75rem;
        color: #777;
    }

    @media (min-width: 768px) {
        .login-card {
            padding: 2.5rem;
        }
    }
</style>