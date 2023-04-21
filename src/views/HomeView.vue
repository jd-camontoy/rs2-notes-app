<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import CreateNoteModal from "../components/CreateNoteModal.vue";
import EditNoteModal from "../components/EditNoteModal.vue";
import { getNoteList } from "../api/requests";

const MODAL_TYPE_CREATE = 'create';
const MODAL_TYPE_EDIT = 'edit';

const isCreateNoteModalOpen = ref(false);
const isEditNoteModalOpen = ref(false);
const noteForEdit = ref({});

const userNotes = ref([]);
const userLabels = ref([]);

const closeCreateModal = () => {
  isCreateNoteModalOpen.value = false;
};

const closeEditModal = () => {
  isEditNoteModalOpen.value = false;
};

function handleCreateNote() {
  isCreateNoteModalOpen.value = true;
}

function handleEditNote(noteItem) {
  noteForEdit.value = noteItem;
  isEditNoteModalOpen.value = true;
}

function closeModalAndReloadData(modalType) {
    if (modalType == MODAL_TYPE_CREATE) {
        isCreateNoteModalOpen.value = false;
    } else if (modalType == MODAL_TYPE_EDIT) {
        isEditNoteModalOpen.value = false;
    }
    loadData();
}

async function loadData() {
  let sessionData = localStorage.getItem("user");
  let loggedInUser = JSON.parse(sessionData);
  const result = await getNoteList(loggedInUser.id);
  //   userNotes.value = result.data.sort((a, b) => { return a.created_at - b.created_at; });
  if (result.success) {
    const resultData = result.data;
    userNotes.value = resultData.notes;
    userLabels.value = resultData.all_labels;
  } else {
    console.log(result);
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <Header />
  <section class="section--main">
    <aside class="aside__label-filter">
      Labels Quick Access
      <div class="aside__label-list">
        <span
          v-for="label in userLabels"
          :key="label"
          class="label label__filter label--unselected"
          >{{ label }}</span
        >
      </div>
    </aside>
    <section class="section--notes">
      <div @click="handleCreateNote" class="note note--create">
        <span>
          <i class="fa-solid fa-plus margin-right-5"></i>
          Create a new note
        </span>
      </div>
      <div
        v-for="note in userNotes"
        :key="note.id"
        @click="handleEditNote(note)"
        class="note"
      >
        <h1>{{ note.title }}</h1>
        <p>{{ note.content }}</p>
        <div class="note__label-list">
          <span
            v-for="label in note.labels"
            :key="label"
            class="label label--default"
            >{{ label }}</span
          >
        </div>
      </div>
    </section>
  </section>
  <CreateNoteModal
    v-if="isCreateNoteModalOpen"
    :closeCreateModalFn="closeCreateModal"
    @noteCreated="closeModalAndReloadData(MODAL_TYPE_CREATE)"
  />
  <EditNoteModal
    v-if="isEditNoteModalOpen"
    :noteItem="noteForEdit"
    :closeEditModalFn="closeEditModal"
    @noteUpdated="closeModalAndReloadData(MODAL_TYPE_EDIT)"
  />
</template>
