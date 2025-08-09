<template>
  <div
    class="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    :class="{ 'opacity-60': todo.completed }"
  >
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
      class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      :data-testid="`todo-${todo.id}-checkbox`"
    />

    <span
      class="flex-1 text-gray-800"
      :class="{ 'line-through text-gray-500': todo.completed }"
      :data-testid="`todo-${todo.id}-text`"
    >
      {{ todo.text }}
    </span>

    <button
      @click="$emit('delete', todo.id)"
      class="p-1 text-gray-400 hover:text-red-500 transition-colors"
      :data-testid="`todo-${todo.id}-delete`"
      title="Deletar tarefa"
    >
      🗑️
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  todo: {
    type: Object,
    required: true,
    validator(todo) {
      return todo && typeof todo.id !== 'undefined' && typeof todo.text === 'string'
    },
  },
})
defineEmits(['toggle', 'delete'])
</script>

<style scoped></style>
