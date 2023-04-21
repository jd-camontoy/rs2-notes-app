<script setup lang="ts">
import { ref, defineEmits, toRefs } from 'vue';

const isAddingLabel = ref(false);
const newLabel = ref('');

const emit = defineEmits(['labelDeleted', 'labelAdded']);

const props = defineProps({
    labels: {
        required: false
    }
})

const { labels } = toRefs(props);

function openLabelForm() {
    isAddingLabel.value = true;
}

function closeLabelForm() {
    isAddingLabel.value = false;
}

function emitLabelDeletion(labelId) {
    emit('labelDeleted', labelId);
}

function emitLabelAddition() {
    emit('labelAdded', newLabel.value);
    newLabel.value = '';
}
</script>


<template>
  <div class="modal__label-list">
    <span v-if="!isAddingLabel" @click="openLabelForm" class="label label--default label--new margin-right-10">
        <i class="fa-solid fa-plus margin-right-5"></i>
        Add a new label
    </span>
    <span v-for="label in labels" :key="label" @click="emitLabelDeletion(label)" class="label label--default">
      {{ label }}
      <i class="fa-solid fa-xmark margin-left-5"></i>
    </span>
  </div>
  <div v-if="isAddingLabel" class="modal__label-list margin-top-20">
    <input
    @keypress.enter="emitLabelAddition"
      v-model="newLabel"
      type="text"
      class="label__input"
      placeholder="Type label, then press enter"
    />
    <button @click="emitLabelAddition" class="btn btn--label-action">
      <i class="fa-solid fa-plus margin-right-5"></i> Add
    </button>
    <button @click="closeLabelForm" class="btn btn--label-action">
      <i class="fa-solid fa-times margin-right-5"></i> Cancel
    </button>
  </div>
</template>
