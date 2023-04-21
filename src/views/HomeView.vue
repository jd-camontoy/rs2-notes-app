<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/Header.vue'
import CreateNoteModal from '../components/CreateNoteModal.vue';

const isCreateNoteModalOpen = ref(false);

const closeModal = () => {
    isCreateNoteModalOpen.value = false;
}

function handleCreateNote() {
    isCreateNoteModalOpen.value = true;
}

</script>

<template>
    <Header />
    <section class="section--main">
            <aside class="aside__label-filter">
                Labels Quick Access
                <div class="aside__label-list">
                    <!-- <span class="label label__filter label--unselected">Label 1</span>
                    <span class="label label__filter label--selected">Label 2</span> -->
                </div>
            </aside>
            <section @click="handleCreateNote" class="section--notes">
                <div class="note note--create">
                    <span>
                        <i class="fa-solid fa-plus margin-right-5"></i>
                        Create a new note
                    </span>
                </div>
                <!-- <div class="note">
                    <h1>Note Title</h1>
                    <p>
                        When the delete button is clicked, the user is presented with a prompt to confirm note
                        deletion. Once confirmed, the note should be deleted from the database. Additionally, make
                        sure that there are no 'unused' labels.
                    </p>
                    <div class="note__label-list">
                        <span class="label label--default">Label 1</span>
                        <span class="label label--default">Label 2</span>
                    </div>
                </div>
                <div class="note">
                    <h1>Note Title</h1>
                    <p>
                        When the delete button is clicked, the user is presented with a prompt to confirm note
                        deletion. Once confirmed, the note should be deleted from the database. Additionally, make
                        sure that there are no 'unused' labels.
                    </p>
                    <div class="note__label-list">
                        <span class="label label--default">Label 1</span>
                        <span class="label label--default">Label 2</span>
                    </div>
                </div>
                <div class="note">
                    <h1>Note Title</h1>
                    <p>
                        When the delete button is clicked, the user is presented with a prompt to confirm note
                        deletion. Once confirmed, the note should be deleted from the database. Additionally, make
                        sure that there are no 'unused' labels.
                    </p>
                    <div class="note__label-list">
                        <span class="label label--default">Label 1</span>
                        <span class="label label--default">Label 2</span>
                    </div>
                </div>
                <div class="note">
                    <h1>Note Title</h1>
                    <p>
                        When the delete button is clicked, the user is presented with a prompt to confirm note
                        deletion. Once confirmed, the note should be deleted from the database. Additionally, make
                        sure that there are no 'unused' labels.
                    </p>
                    <div class="note__label-list">
                        <span class="label label--default">Label 1</span>
                        <span class="label label--default">Label 2</span>
                    </div>
                </div> -->
            </section>
        </section>
        <CreateNoteModal v-if="isCreateNoteModalOpen" :closeModalFn="closeModal" @noteCreated="closeModal" />
</template>