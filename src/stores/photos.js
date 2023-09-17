import { defineStore } from "pinia";

export const usePhotoStore = defineStore("photos", {
  state: () => ({
    photos: null,
    totalPhotos: null,
    loading: false,
    blocksearch: false,
    photo: null,
    isLiked: false,
    likedPhotos: []
  }),
  actions: {
    async getPhotos(searchQuery, page = 1, isNewParams = false, perPage = 9) {
      if (
        Array.isArray(this.photos) &&
        !isNewParams &&
        this.photos.length >= this.totalPhotos &&
        this.blocksearch
      ) {
        console.log(`Это все результаты поиска ${this.totalPhotos}`);
        return;
      }

      const clientId = "e9WG-f3JZU2OyE-BCYQyIiWMtbOFF3nXhH8VISwYUis";
      let apiUrl = `https://api.unsplash.com/photos/?client_id=${clientId}&page=${page}&per_page=${perPage}&query=dog`;
      if (searchQuery) {
        apiUrl = `https://api.unsplash.com/search/photos?client_id=${clientId}&page=${page}&per_page=${perPage}&query=${searchQuery}`;
      }

      this.loading = true;

      try {
        const response = await fetch(apiUrl);
        let totalCount = response.headers.get("X-Total");

        const data = await response.json();

        if (Array.isArray(this.photos) && !isNewParams) {
          if (data.results) {
            this.photos.push(...data.results);
          } else {
            this.photos.push(...data);
          }
        } else {
          if (data.results) {
            this.photos = data?.results;
          } else {
            this.photos = data;
          }
        }
        if (isNewParams && searchQuery) {
          totalCount = data.total;
          console.log(this.photos);
        }
        this.totalPhotos = totalCount;

        console.log(`Всего фотографий: ${totalCount}`);
      } catch (error) {
        console.error("Произошла ошибка при загрузке фотографий:", error);
      } finally {
        this.loading = false;
        this.blocksearch = true;
      }
    },
    async getPhoto(id) {
      const clientId = "e9WG-f3JZU2OyE-BCYQyIiWMtbOFF3nXhH8VISwYUis";
      let apiUrl = `https://api.unsplash.com/photos/${id}?client_id=${clientId}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        this.photo = data;
        console.log(this.isIdInLocalStorage(id))
        this.isLiked = this.isIdInLocalStorage(id)
      } catch (error) {
        console.error("Произошла ошибка при загрузке фотографии:", error);
      } finally {
      }
    },
    async likePhoto(id) {
      // Запрос не отрабатывает(Нужна дополнительная авторизация)
      // const clientId = "e9WG-f3JZU2OyE-BCYQyIiWMtbOFF3nXhH8VISwYUis";

      // const apiUrl = `https://api.unsplash.com/photos/${id}/like?client_id=${clientId}`;

      // const requestOptions = {
      //   method: "POST",
      // };

      // try {
      //   const response = await fetch(apiUrl, requestOptions);

      //   if (response.ok) {
      //     // Фотография успешно лайкнута
      //     console.log(`Фотография с ID ${id} успешно лайкнута.`);
      //   } else {
      //     // Обработка ошибки, если лайк не удался
      //     console.error("Ошибка при лайкании фотографии:", response.statusText);
      //   }
      // } catch (error) {
      //   console.error("Произошла ошибка при отправке лайка:", error);
      // }
      const storedIds = JSON.parse(localStorage.getItem('likedPhoto')) || [];

      const index = storedIds.indexOf(id);

      if (index !== -1) {
        storedIds.splice(index, 1);
      } else {
        storedIds.push(id);
      }
      localStorage.setItem('likedPhoto', JSON.stringify(storedIds));
      this.isLiked = this.isIdInLocalStorage(id)
    },
    isIdInLocalStorage(id) {
      // Получаем текущий массив из локального хранилища (если он существует)
      const storedIds = JSON.parse(localStorage.getItem('likedPhoto')) || [];
      console.log(storedIds.includes(id));
      // Проверяем, есть ли переданный ID в массиве
      return storedIds.includes(id);
    },
    async getLikedPhotos() {
      const clientId = "e9WG-f3JZU2OyE-BCYQyIiWMtbOFF3nXhH8VISwYUis";
      
      this.likedPhotos = [];
      const storedIds = JSON.parse(localStorage.getItem('likedPhoto')) || [];
      
      // Создаем массив промисов для выполнения асинхронных запросов
      const requests = storedIds.map(async (elem) => {
        try {
          let apiUrl = `https://api.unsplash.com/photos/${elem}?client_id=${clientId}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          return data; // Возвращаем данные фотографии
        } catch (error) {
          console.error("Произошла ошибка при загрузке фотографии:", error);
          return null; // Возвращаем null в случае ошибки
        }
      });
    
      // Ждем выполнения всех промисов и получаем результаты
      const photosData = await Promise.all(requests);
      
      // Фильтруем null, оставляя только успешно полученные фотографии
      this.likedPhotos = photosData.filter((photo) => photo !== null);
    }
  },
});
