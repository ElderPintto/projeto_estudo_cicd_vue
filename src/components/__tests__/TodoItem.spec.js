import { mount } from '@vue/test-utils'
 import TodoItem from '@/components/TodoItem.vue'

describe('TodoItem.vue', () => {
    const mockTodo = { id: 1, text: 'Test todo', completed: false }
    it('renders todo text', () => {
        const wrapper = mount(TodoItem, { props: { todo: mockTodo } })
        expect(wrapper.text()).toContain('Test todo')
    }) 
    it('emits toggle event when checkbox is clicked',
        async () => {
            const wrapper = mount(TodoItem, { props: { todo: mockTodo } }) 
            await wrapper.find('[data-testid="todo-1-checkbox"]').trigger('change')
            expect(wrapper.emitted('toggle')).toBeTruthy() 
            expect(wrapper.emitted('toggle')[0]).toEqual([1])
        
    })
    it('emits delete event when delete button is clicked', async () => {
        const wrapper = mount(TodoItem, { props: { todo: mockTodo } }) 
        await wrapper.find('[data-testid="todo-1-delete"]').trigger('click')
        expect(wrapper.emitted('delete')).toBeTruthy() 
        expect(wrapper.emitted('delete')[0]).toEqual([1])
    })
    it('applies completed styling when todo is completed', () => {
        const completedTodo = {
            ...mockTodo,
            completed: true
        } 
        const wrapper = mount(TodoItem, { props: { todo: completedTodo } }) const
            textElement = wrapper.find('[data-testid="todo-1-text"]')
        expect(textElement.classes()).toContain('line-through')
    })
})