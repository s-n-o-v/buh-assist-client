<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { CertService } from "~/service/cert-service";
import type { ICert } from "~/types/ICert";

definePageMeta({ middleware: 'auth' });
useHead({ title: "Список сертификатов" });

const toast = useToast();
const service = new CertService();

const metaKey = ref<boolean>(true);
const entities = ref<ICert[]>([]);
const editingRows = ref([]);
const deleteDialog = ref<boolean>(false);
const newDialog = ref<boolean>(false);
const newItem = ref<string>("");
const entity = ref();

const itemsDb = await service.list();
const entitiesMapper = (list: any) =>
  list?.reduce((acc: any, v: any) => {
    acc.push({
      id: v.id,
      name: v.client.name,
      valid: v.valid_to,
    });
    return acc;
  }, []);
const reloadData = async () => {
  const reloaded = await service.list();
  if (reloaded) entities.value = entitiesMapper(reloaded.data);
};
const selectedProduct = () => {};
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const itemsBE = computed(() => entitiesMapper(itemsDb.data));
entities.value = itemsBE.value;

const onCreate = () => {
  newDialog.value = true;
};
const createEntity = async () => {
  const res = await service.create({ name: newItem.value});
  if (res?.data?.id) {
    toast.add({
      severity: 'success',
      summary: 'Добавление записи',
      detail: 'Запись успешно добавлена',
      life: 3000
    });
    newDialog.value = false;
    await reloadData();
  }
};
const onRowEditSave = async (event) => {
  let { newData, index } = event;
  const res = await service.update(newData);
  if (res?.data?.id) {
    entities.value[index] = newData;
    toast.add({
      severity: 'success',
      summary: 'Обновление записи',
      detail: 'Запись успешно обновлена',
      life: 3000
    });
  }
};
const confirmDelete = (event) => {
  entity.value = event;
  deleteDialog.value = true;
};
const deleteEntity = async (id: number) => {
  await service.remove(id);
  toast.add({
    severity: 'success',
    summary: 'Удаление записи',
    detail: 'Запись удалена успешно',
    life: 3000
  });
  reloadData();
  deleteDialog.value = false;
};
</script>

<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      v-model:editingRows="editingRows"
      v-model:selection="selectedProduct"
      selection-mode="single"
      :meta-key-selection="metaKey"
      data-key="id"
      :value="entities"
      editMode="row"
      scrollable
      striped-rows
      class="mt-6"
      @row-edit-save="onRowEditSave"
      :global-filter-fields="['name']"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          bodycell: ({ state }) => ({
            style:  state['d_editing']&&'padding-top: 0.75rem; padding-bottom: 0.75rem'
          })
        }
      }"
    >
      <template #empty> Данные отсутствуют. </template>
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between">
          <h4 class="m-0">Список сертификатов</h4>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              placeholder="Поиск..."
            />
          </IconField>
        </div>
      </template>
      <Column field="id" header="#" style="min-width: 30px" class="font-bold" />
      <Column field="name" sortable header="Клиент" />
      <Column field="valid" sortable header="Действует до">
        <template #body="{ data }">
          {{ data.valid.substring(0, 10) }}
        </template>      
      </Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="deleteDialog"
    :style="{ width: '50vw', minWidth: '300px', maxWidth: '600px' }"
    header="Удаление"
    :modal="true"
  >
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="entity?.id">
        Вы уверены, что хотите удалить эту запись?<br />
        [
        <b>{{ entity.name }}</b>
        ]?
      </span>
    </div>
    <template #footer>
      <Button
        label="Отменить"
        icon="pi pi-times"
        text
        @click="deleteDialog = false"
      />
      <Button
        label="Удалить"
        icon="pi pi-check"
        class="p-button-primary"
        @click="deleteEntity(entity.id)"
      />
    </template>
  </Dialog>
</template>
