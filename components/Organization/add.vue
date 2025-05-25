<script setup lang="ts">
import { OrganizationService } from "~/service/org-service";
import type { IOrganization } from "~/types/IOrganization";

const newItem = ref<string>("");

interface Emits {
  (e: 'close'): void
  (e: 'created', id: IOrganization): void
}
const emit = defineEmits<Emits>();

const createEntity = async () => {
const service = new OrganizationService();
  const org: IOrganization = {
    id: 0,
    name: newItem.value,
  };
  const result = await service.create(org);
  org.id = result.data.id;
  emit("created", org);
};
const cancel = async () => {
  emit("close");
};
</script>

<template>
  <div class="w-full flex gap-2 my-4">
    <FloatLabel class="w-full">
      <InputText id="org" v-model="newItem" fluid />
      <label for="org">Новая организация</label>
    </FloatLabel>
    <Button icon="pi pi-check" rounded variant="outlined" class="w-[45px]" @click="createEntity" />
    <Button icon="pi pi-times" severity="danger" rounded variant="outlined" class="w-[45px]" @click="cancel" />
  </div>
</template>
