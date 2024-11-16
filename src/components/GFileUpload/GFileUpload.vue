<script setup lang="ts">
import { ref, defineProps, type PropType } from 'vue'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import ProgressBar from 'primevue/progressbar'
import GIcon from '../GIcon/GIcon.vue'
import { palette } from '@/constants/palette'
import { IconNamesMaterial } from '@/types/enums/iconNamesEnums'

const props = defineProps({
  accept: {
    type: String,
    default: '.csv',
  },
  maxFileSize: {
    type: Number,
    default: 20000000,
  },
  handleUploadFile: {
    type: Function as PropType<(file: File | null) => void>,
    required: true,
  },
})

const uploadedFile = ref<File | null>(null)
const uploadProgress = ref(0)

function handleUpload(event: FileUploadSelectEvent) {
  const files = Array.isArray(event.files) ? event.files : [event.files]
  const file = files[0]

  if (file) {
    if (file.type === 'text/csv') {
      if (file.size <= props.maxFileSize) {
        uploadedFile.value = file
        simulateUpload(file)
      } else {
        alert(
          `Le fichier est trop volumineux. La taille maximale autorisée est de ${
            props.maxFileSize / 1000000
          }MB.`,
        )
      }
    } else {
      alert('Veuillez télécharger un fichier CSV valide.')
    }
  }
}

function simulateUpload(file: File) {
  uploadProgress.value = 0

  const interval = setInterval(() => {
    if (uploadProgress.value < 100) {
      uploadProgress.value += 10
    } else {
      clearInterval(interval)
      props.handleUploadFile(file)
    }
  }, 200)
}

const dropMessage = 'Glissez et déposez un fichier CSV ici ou cliquez pour en choisir un.'

function deleteFile() {
  uploadedFile.value = null
  props.handleUploadFile(null)
}
</script>

<template>
  <div>
    <FileUpload
      name="file"
      uploadLabel="Sélectionner"
      :accept="props.accept"
      :maxFileSize="props.maxFileSize"
      :customUpload="true"
      :auto="true"
      :showUploadButton="false"
      :showCancelButton="false"
      @select="handleUpload"
      class="w-full"
      placeholder="Sélectionnez un fichier CSV"
    >
      <template #empty>
        <div class="flex items-center justify-center flex-col">
          <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
          <div v-if="uploadedFile" class="flex mt-6 mb-0">
            <div @click="deleteFile" class="cursor-pointer">
              <GIcon :color="palette.green" :name="IconNamesMaterial.DELETE" />
            </div>
            {{ uploadedFile.name }}
          </div>
          <div v-else class="mt-6 mb-0">
            {{ dropMessage }}
          </div>
        </div>
      </template>
    </FileUpload>

    <div v-if="uploadProgress > 0 && uploadProgress < 100 && uploadedFile" class="mt-4">
      <ProgressBar :value="uploadProgress" />
      <p class="text-white mt-2 text-center">Progression : {{ uploadProgress }}%</p>
    </div>

    <div
      v-else-if="uploadProgress === 100 && uploadedFile"
      class="text-white mt-4 text-center text-green-500"
    >
      <p>Upload terminé !</p>
    </div>
  </div>
</template>

<style scoped>
.progress {
  margin-top: 20px;
}
</style>
