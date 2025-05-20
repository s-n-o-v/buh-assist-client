<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import { OrganizationService } from "~/service/org-service";
import type { ITag } from "~/types/ITag";

definePageMeta({ middleware: 'auth' });

const toast = useToast();
const service = new OrganizationService();

const metaKey = ref<boolean>(true);
const entities = ref<ITag[]>([]);
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
      name: v.name,
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
    <Toolbar class="mb-6">
      <template #start>
        <Button
          v-if="!newDialog"
          label="Добавить организацию"
          icon="pi pi-plus"
          severity="success"
          class="mr-2"
          @click="onCreate"
        />
        <div v-else class="flex min-w-96 gap-2">
          <InputText fluid v-model="newItem" placeholder="Введите название тега" autofocus />
          <Button icon="pi pi-check" rounded variant="outlined" class="w-[50px]" @click="createEntity" />
          <Button icon="pi pi-times" severity="danger" rounded variant="outlined" class="w-[50px]" @click="newDialog = false" />
        </div>
      </template>
    </Toolbar>
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
          <h4 class="m-0">Список организаций</h4>
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
      <Column field="name" sortable header="Организация">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid />
        </template>
      </Column>
      <Column :rowEditor="true" style="width: 55px; padding-right: 0" bodyStyle="text-align:center" />
      <Column :exportable="false" style="width: 55px; padding-left: 0" bodyStyle="text-align:center">
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDelete(slotProps.data)"
          />
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
