<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, minValue } from "@vuelidate/validators";
import { Divider } from "primevue";
import { OrganizationService } from "~/service/org-service";
import { TaxReportService } from '~/service/tax-report-service';
import type { IOrganization } from "~/types/IOrganization";
import type { ITaxReport } from '~/types/ITaxReport';

definePageMeta({ middleware: 'auth' });
useHead({ title: "Добавление нового типа отчета" });

const toast = useToast();
const service = new TaxReportService();
const serviceOrg = new OrganizationService();

const submitted = ref<boolean>(false);
const activeForm = ref<boolean>(true);
const showSelection = ref<boolean>(false);
const addNewOffice = ref<boolean>(false);
const offices = ref<IOrganization[]>([]);
const selectedOffice = ref();
const office = computed(() => {
  return selectedOffice.value ? offices.value.find(o => o.id === selectedOffice.value)?.name : "";
});
const submitFormIcon = computed(() =>
  activeForm.value ? "pi-check" : "pi-spin pi-spinner",
);

serviceOrg.list().then((res) => {
  offices.value = res.data;
});

const errors = reactive({
  name: "Поле обязательно для заполнения",
});

const periodList = ref([
  { label: "Ежемесячно", value: 1 },
  { label: "Ежеквартально", value: 2 },
  { label: "Каждые полгода", value: 3 },
  { label: "Ежегодно", value: 4 },
]);

const state = reactive<ITaxReport>({
  id: undefined,
  name: "",
  tax_office_id: undefined,
  fine: undefined,
  is_periodic: true,
  report_date: undefined,
  every_month: undefined,
});

const rules = computed(() => ({
  name: { required, minLength: minLength(3) },
  fine: { required },
}));
const v$ = useVuelidate(rules, state);

const selectOffice = (event: any) => {
  console.log("event", event);
  selectedOffice.value = event.value;
  state.tax_office_id = event.value;
  showSelection.value = false;
};
const onCancel = () => navigateTo(`/tax-reports`);
const onSubmit = async () => {
  submitted.value = true;
  // activeForm.value = false;
  toast.add({
    severity: "success",
    summary: "Submit pressed",
    detail: "Trying to submit form",
    life: 3150,
  });
  // const result = await v$.value.$validate();
  // if (!result) {
  //   const errs: string[] = [];
  //   v$.value.$errors.forEach((err) => {
  //     errs.push("- " + errors[err.$propertyPath]);
  //   });
  //   toast.add({
  //     severity: "error",
  //     summary: "Ошибка валидации формы",
  //     detail: errs.join("\n"),
  //     life: 3150,
  //   });
  //   activeForm.value = true;
  //   return;
  // }

  // const dbItem = {
  //   hotel_id: route.params.id,
  //   name: state.name,
  //   quantity: state.amount,
  //   description: state.description,
  // };

  // const response = await service.add(dbItem);
  // if (response) {
  //   toast.add({
  //     severity: "success",
  //     summary: "Сохранение",
  //     detail: "Транспорт успешно сохранен",
  //     life: 3150,
  //   });
  //   onCancel();
  // } else {
  //   activeForm.value = true;
  //   toast.add({
  //     severity: "error",
  //     summary: "Error",
  //     detail: "Ошибка сохранения транспорта",
  //     life: 3150,
  //   });
  // }
};

</script>

<template>
  <div class="card">
    <span class="text-surface-900 dark:text-surface-0 text-xl font-bold mb-6 block">
      Добавление нового типа отчета
    </span>
    <Divider />
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-col md:flex-row gap-2 items-center my-4">
          <label class="w-full md:w-1/5 required">
            Название типа отчета
          </label>
          <div class="grow">
            <InputText
              v-model="state.name"
              type="text"
              :invalid="v$.name.$error && submitted"
              :disabled="!activeForm"
              class="p-inputtext p-component p-inputtext-fluid"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-2 items-center mb-4">
          <label class="w-full md:w-1/5 required">
            Организация
          </label>
          <div class="grow">
            <InputGroup>
              <InputText disabled :value="office" />
              <InputGroupAddon>
                <Button icon="pi pi-angle-down" severity="secondary" @click="showSelection = true" />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <div class="w-full flex flex-col md:flex-row gap-2 items-center mb-4">
          <label class="w-full md:w-1/5 required">
            Размер отчисления
          </label>
          <div class="grow">
            <InputNumber
              v-model="state.fine"
              :min="0"
              :use-grouping="false"
              :invalid="v$.fine.$error && submitted"
              :disabled="!activeForm"
              class="p-component p-inputtext-fluid"
            />
          </div>
        </div>
        <div class="w-full flex flex-col md:flex-row gap-2 items-center mb-4">
          <label class="w-full md:w-1/5 required">
            Отчет периодический
          </label>
          <div class="grow">
            <Checkbox v-model="state.is_periodic" binary />
          </div>
        </div>
        <div v-if="state.is_periodic" class="w-full flex flex-col md:flex-row gap-2 items-center mb-4">
          <label class="w-full md:w-1/5 required">
            Периодичность
          </label>
          <div class="grow">
            <Select
              v-model="state.every_month"
              :options="periodList"
              option-label="label"
              option-value="value"
              placeholder="Укажите периодичность"
            />
          </div>
        </div>
        <div v-else class="w-full flex flex-col md:flex-row gap-2 items-center mb-4">
          <label class="w-full md:w-1/5 required">
            Дата отчета
          </label>
          <div class="grow">
            <DatePicker v-model="state.report_date" show-icon />
          </div>
        </div>
      </div>
      <Divider />
      <div class="flex justify-end gap-4 mt-6">
        <Button
          label="Сохранить"
          class="p-button-primary mr-2"
          :icon="`pi ${submitFormIcon}`"
          :disabled="!activeForm"
          type="submit"
        />
        <Button
          label="Назад"
          severity="secondary"
          icon="pi pi-times"
          @click="onCancel"
        />
      </div>
    </form>
  </div>
  <Drawer
    v-model:visible="showSelection"
    header="Выберите организацию"
    class="!w-full md:!w-80 lg:!w-[30rem]"
    position="right"
  >
    <Button label="Добавить новую организацию" variant="link" />
    <Listbox
      v-model="selectedOffice"
      :options="offices"
      :highlightOnSelect="false"
      option-label="name"
      option-value="id"
      checkmark
      class="w-full mt-2"
      @change="selectOffice"
    >
      <template #optiongroup="slotProps">
        <div class="flex items-center">
          <div>{{ slotProps.data.name }}</div>
        </div>
      </template>
    </Listbox>
  </Drawer> 
</template>

<style scoped></style>
