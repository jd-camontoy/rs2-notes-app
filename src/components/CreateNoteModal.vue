<script setup lang="ts">
import LabelForm from '../components/LabelForm.vue';
import { ref, computed, defineEmits } from 'vue';
import { addNote } from '../api/requests';

const props = defineProps({
    closeCreateModalFn: {
        required: true
    }
});

const emit = defineEmits(['noteCreated']);

const noteTitle = ref('');
const noteContent = ref('');
const sampleLabels = ref([]);

const formIsValid = computed(() => {
    return (noteTitle.value != '' && noteContent.value != '');
})

function filterLabel(labelToDelete) {
    const newLabels = sampleLabels.value.filter(label => label != labelToDelete);
    sampleLabels.value = newLabels;
}

function addLabel(labelItem) {
    const newLabels = [
        ...sampleLabels.value,
        labelItem
    ];
    sampleLabels.value = newLabels;
}

async function handleSubmitNote() {
    let sessionData = localStorage.getItem('user');
    let loggedInUser = JSON.parse(sessionData);
    // Add typing to user data
    const result = await addNote({
        title: noteTitle.value,
        content: noteContent.value,
        label_list: sampleLabels.value,
        user_id: loggedInUser.id
    });
    if (result.success) {
        emit('noteCreated');
    } else {
        console.error(result);
    }
}
</script>

<template>
  <div class="modal" @click.self="closeCreateModalFn">
    <div class="modal__card">
      <span @click="closeCreateModalFn" class="modal__close">
        <i class="fa-solid fa-xmark"></i>
      </span>
      <div class="modal__text-inputs modal__text-inputs--new">
        <input v-model="noteTitle" type="text" class="input__note input__note-title" placeholder="The note title goes here" />
        <textarea v-model="noteContent" class="input__note input__note-content" placeholder="While enter the note details here..."></textarea>
      </div>
      <LabelForm :labels="sampleLabels" @labelDeleted="filterLabel" @labelAdded="addLabel" />
      <div class="modal__actions">
        <button class="btn btn--primary" @click="handleSubmitNote" :disabled="!formIsValid">
          <i class="fa-solid fa-floppy-disk margin-right-5"></i>
          Save Note
        </button>
      </div>
    </div>
  </div>
</template>
