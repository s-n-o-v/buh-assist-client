const ClientService = () => {
  const list = async () => {
    const { data, error } = await useFetch(`/api/client/list`);
    if (error.value) {
      throw new Error(error.value?.data?.message || 'No data');
    }

    return data.value;
  };

  return {
    list,
  };
};

export default ClientService;
