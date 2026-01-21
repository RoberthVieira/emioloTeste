<script setup lang="ts">
    defineProps<{
        user: {
            name: string
            email: string
            avatar?: string
        }
    }>()
</script>

<template>
    <div class="user-card">
        <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="Avatar"
            class="avatar"
        />

        <div class="info">
            <strong>{{ user.name }}</strong>
            <span>{{ user.email }}</span>
        </div>
  </div>
</template>

<style scoped>
    .user-card {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.85rem;
        background: #151515; 
        border: 1px solid #ffe81f;
        border-radius: 4px; 
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .user-card:hover {
        transform: translateX(5px); 
        background: #1a1a1a;
        box-shadow: 0 0 10px rgba(255, 232, 31, 0.2);
    }

    .avatar {
        width: 44px;
        height: 44px;
        border-radius: 4px; 
        border: 1px solid #444;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        overflow: hidden;
    }

    .info strong {
        color: #ffe81f; 
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .info span {
        color: #888; 
        font-size: 0.8rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>