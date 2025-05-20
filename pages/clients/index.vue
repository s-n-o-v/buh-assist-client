<script setup lang="ts">
import { FilterMatchMode } from "@primevue/core/api";
import ClientService from "~/service/client-service";

definePageMeta({ middleware: 'auth' });

const toast = useToast();
const service = ClientService();

const metaKey = ref<boolean>(true);
const entities = ref([]);
const deleteDialog = ref<boolean>(false);
const state = reactive({
  id: 0,
  name: "",
});

const itemsDb = await service.list();
const entitiesMapper = (list: any) =>
  list?.reduce((acc: any, v: any) => {
    acc.push({
      id: v.id,
      name: v.name,
      email: v.email,
      phone: v.phone,
      tags: v.tags,
      // certDate: FormateDateTime(v.updatedAt),
    });
    return acc;
  }, []);

const selectedProduct = () => {};
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const itemsBE = computed(() => entitiesMapper(itemsDb.data));
entities.value = itemsBE.value;

const onCreate = () => { };
const onEdit = (id: number) => { };
const onDelete = (id: number) => { };
</script>

<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <Button
          label="Добавить нового клиента"
          icon="pi pi-plus"
          severity="success"
          class="mr-2"
          @click="onCreate"
        />
      </template>
    </Toolbar>
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedProduct"
      selection-mode="single"
      :meta-key-selection="metaKey"
      data-key="id"
      :value="entities"
      scrollable
      striped-rows
      class="mt-6"
      :global-filter-fields="['name', 'email', 'phone', 'tags']"
    >
      <template #empty> Данные отсутствуют. </template>
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between">
          <h4 class="m-0">Список клиентов</h4>
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
      <Column
        field="id"
        header="#"
        style="min-width: 30px"
        class="font-bold"
      />
      <Column field="name" sortable header="Клиент">
        <template #body="{ data }">
          <NuxtLink class="table-name-link" @click="onEdit(data.id)">
            {{ data.name }}
          </NuxtLink>
        </template>
      </Column>
      <Column field="email" sortable header="email"></Column>
      <Column field="phone" sortable header="Телефон"></Column>
      <Column field="tags" header="Теги">
        <template #body="slotProps">
          <div class="flex gap-1">
            <Tag v-for="tag in slotProps.data.tags" :key="tag.id" :value="tag.name" />
          </div>
        </template>
      </Column>
      <Column :exportable="false" style="width: 10rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-cog"
            outlined
            rounded
            class="mr-2"
            @click="onEdit(slotProps.data.id)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="onDelete(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
