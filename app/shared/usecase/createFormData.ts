function isAnArrayorPush(key: any, value: any, formData: any) {
    if (value || value === false || value === 0) {
      if (Array.isArray(value)) {
        value.forEach((e, i) => {
          let k = `${key}[${i}]`;
          let val = e;
          if (typeof e === "object") {
            const isFile: boolean = e instanceof File;
            if (!isFile) {
              for (const j in e) {
                k = `${key}[${i}][${j}]`;
                val = e[j];
                isAnArrayorPush(k, val, formData);
              }
            } else {
              formData.append(`${key}[${i}]`, e);
            }
          } else {
            isAnArrayorPush(k, val, formData);
          }
        });
      } else if (typeof value === "object") {
        const isFile: boolean = value instanceof File;
        if (!isFile) {
          Object.keys(value).forEach((obj) => {
            isAnArrayorPush(obj, value[obj], formData);
          });
        } else {
          formData.append(key, value);
        }
      } else {
        formData.append(key, value);
      }
    }
  }
  
  export function createFormData(data: any) {
    const formData = new FormData();
    Object.keys(data).forEach((item) => {
      isAnArrayorPush(item, data[item], formData);
    });
  
    return formData;
  }
  