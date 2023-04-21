<script setup lang="ts">
import LabelForm from "../components/LabelForm.vue";
import { ref, computed, toRefs, defineEmits } from "vue";
import { updateNote, deleteNote } from "../api/requests";

const props = defineProps({
  closeEditModalFn: {
    required: true,
  },
  noteItem: {
    required: true,
  },
});

const { noteItem } = toRefs(props);

const emit = defineEmits(["noteUpdated", "noteDeleted"]);

const noteTitle = ref(noteItem.value.title);
const noteContent = ref(noteItem.value.content);
const noteLabels = ref(noteItem.value.labels);

const removedLabels = ref([]);
const addedLabels = ref([]);

const isDeleteConfirmationDisplayed = ref(false);

const formIsValid = computed(() => {
  const receivedNoteItem = noteItem.value;
  const isNotSameContent =
    receivedNoteItem.title != noteTitle.value ||
    receivedNoteItem.content != noteContent.value ||
    removedLabels.value.length > 0 ||
    addedLabels.value.length > 0;
  const isEmpty = noteTitle.value != "" && noteContent.value != "";

  if (isNotSameContent) {
    return isEmpty;
  }
  return isNotSameContent;
});

function filterLabel(labelToDelete) {
  const formattedAddedLabels = addedLabels.value.map((label) =>
    label.toLowerCase()
  );
  const isDeletedLabelOnAddedLabels = formattedAddedLabels.includes(
    labelToDelete.toLowerCase()
  );
  if (isDeletedLabelOnAddedLabels) {
    const newAddedLabels = addedLabels.value.filter(
      (label) => label.toLowerCase() != labelToDelete.toLowerCase()
    );
    addedLabels.value = newAddedLabels;
  } else {
    removedLabels.value = [...removedLabels.value, labelToDelete];
  }
  const newLabels = noteLabels.value.filter((label) => label != labelToDelete);
  noteLabels.value = newLabels;
}

function addLabel(labelItem) {
  const formattedDeletedLabels = removedLabels.value.map((label) =>
    label.toLowerCase()
  );
  const isAddedLabelOnDeleteLabels = formattedDeletedLabels.includes(
    labelItem.toLowerCase()
  );

  const existingLabels = noteLabels.value.map((label) => label.toLowerCase());
  const isNewLabelExisting = existingLabels.includes(labelItem.toLowerCase());
  if (!isNewLabelExisting) {
    if (isAddedLabelOnDeleteLabels) {
      const newDeletedLabels = removedLabels.value.filter(
        (label) => label.toLowerCase() != labelItem.toLowerCase()
      );
      removedLabels.value = newDeletedLabels;
    } else {
      addedLabels.value = [...addedLabels.value, labelItem];
    }
    const newLabels = [...noteLabels.value, labelItem];
    noteLabels.value = newLabels;
  }
}

function buildUpdateParameters() {
  const receivedNoteItem = noteItem.value;
  let updateParameters = {
    note_id: noteItem.value.id,
  };

  if (receivedNoteItem.title != noteTitle.value) {
    updateParameters["new_title"] = noteTitle.value;
  }
  if (receivedNoteItem.content != noteContent.value) {
    updateParameters["new_content"] = noteContent.value;
  }
  if (addedLabels.value.length > 0) {
    updateParameters["added_labels"] = addedLabels.value;
  }
  if (removedLabels.value.length > 0) {
    updateParameters["removed_labels"] = removedLabels.value;
  }

  return updateParameters;
}

function toggleDeleteConfirmationDisplay() {
  isDeleteConfirmationDisplayed.value = !isDeleteConfirmationDisplayed.value;
}

async function handleSubmitNote() {
  let generatedParams = buildUpdateParameters();
  const result = await updateNote(generatedParams);
  if (result.success) {
    emit("noteUpdated");
  } else {
    console.error(result);
  }
}

async function handleDeleteNote() {
  const result = await deleteNote(noteItem.value.id);
  if (result.success) {
    emit("noteDeleted");
  } else {
    console.error(result);
  }
}
</script>

<template>
  <div class="modal" @click.self="closeEditModalFn">
    <div class="modal__card">
      <span @click="closeEditModalFn" class="modal__close">
        <i class="fa-solid fa-xmark"></i>
      </span>

      <template v-if="!isDeleteConfirmationDisplayed">
        <div class="modal__text-inputs modal__text-inputs--new">
          <input
            v-model="noteTitle"
            type="text"
            class="input__note input__note-title"
            placeholder="The note title goes here"
          />
          <textarea
            v-model="noteContent"
            class="input__note input__note-content"
            placeholder="While enter the note details here..."
          ></textarea>
        </div>
        <LabelForm
          :labels="noteLabels"
          @labelDeleted="filterLabel"
          @labelAdded="addLabel"
        />
        <div class="modal__actions">
          <span
            @click="toggleDeleteConfirmationDisplay"
            class="action"
          >
            <i class="fa-solid fa-trash-can margin-right-5"></i>
            Delete Note
          </span>
          <button
            class="btn btn--primary"
            @click="handleSubmitNote"
            :disabled="!formIsValid"
          >
            <i class="fa-solid fa-floppy-disk margin-right-5"></i>
            Save Note
          </button>
        </div>
      </template>

      <template v-if="isDeleteConfirmationDisplayed">
        <div class="modal__text">
          Are you sure you want to delete this note?
        </div>
        <div class="modal__actions modal__actions--confirmation">
          <span
            @click="toggleDeleteConfirmationDisplay"
            class="action"
          >
            <i class="fa-solid fa-chevron-left margin-right-5"></i>
            Back to Edit Mode
          </span>
          <button @click="handleDeleteNote" class="btn btn--primary">Yes, delete the note</button>
        </div>
      </template>
    </div>
  </div>
</template>
