<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import CreateNoteModal from "../components/CreateNoteModal.vue";
import EditNoteModal from "../components/EditNoteModal.vue";
import { getNoteList } from "../api/requests";

const MODAL_TYPE_CREATE = "create";
const MODAL_TYPE_EDIT = "edit";

const isCreateNoteModalOpen = ref(false);
const isEditNoteModalOpen = ref(false);
const noteForEdit = ref({});

const userNotes = ref([]);
const displayedNotes = ref([]);
const userLabels = ref([]);
const toggledLabels = ref([]);

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

function filterDisplayedNotes(searchString) {
    let newDisplayedNotes = userNotes.value.filter(note => {
        let combinedTitleAndContent = note.title + ' ' + note.content;
        combinedTitleAndContent = combinedTitleAndContent.toLocaleLowerCase();
        if (combinedTitleAndContent.includes(searchString.toLowerCase())) {
            return note;
        }
    });
    displayedNotes.value = newDisplayedNotes;
}

function toggleLabelFilter(toggledLabel) {
    const toggledFilterList = toggledLabels.value;
    let newFilterList;
    if (toggledFilterList.includes(toggledLabel)) {
        newFilterList = toggledLabels.value.filter(label => label != toggledLabel);
    } else {
        newFilterList = [...toggledLabels.value, toggledLabel]
    }
    toggledLabels.value = newFilterList;

    let newDisplayedNotes = userNotes.value.filter(note => {
        let currentNoteLabels = note.labels.join(' ');
        let toggleLabelList = toggledLabels.value.join(' ');
        if (currentNoteLabels.includes(toggleLabelList)) {
            return note;
        }
    });
    displayedNotes.value = newDisplayedNotes;
}

function isLabelToggled(label) {
    return toggledLabels.value.includes(label);
}

async function loadData() {
  let sessionData = localStorage.getItem("user");
  let loggedInUser = JSON.parse(sessionData);
  const result = await getNoteList(loggedInUser.id);
  if (result.success) {
    const resultData = result.data;
    userNotes.value = resultData.notes;
    displayedNotes.value = resultData.notes;
    userLabels.value = resultData.all_labels;
  } else {
    console.error(result);
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <Header @searchEvent="filterDisplayedNotes" />
  <section class="section--main">
    <aside class="aside__label-filter">
      Labels Quick Access
      <div v-if="userLabels.length" class="aside__label-list">
        <span
          v-for="label in userLabels"
          :key="label"
          @click="toggleLabelFilter(label)"
          class="label label__filter"
          :class="[ isLabelToggled(label) ? 'label--selected' : 'label--unselected' ]"
          >{{ label }}</span
        >
      </div>
      <div v-if="!userLabels.length" class="aside__no-labels">
        <i class="fa-regular fa-face-sad-cry"></i>
        No labels yet
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
        v-for="note in displayedNotes"
        :key="note.id"
        @click="handleEditNote(note)"
        class="note note--item"
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
    @noteDeleted="closeModalAndReloadData(MODAL_TYPE_EDIT)"
  />
</template>
