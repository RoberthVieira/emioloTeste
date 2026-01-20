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
        padding: 0.75rem;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .info {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
    }

    .info span {
        color: #555;
    }
</style>