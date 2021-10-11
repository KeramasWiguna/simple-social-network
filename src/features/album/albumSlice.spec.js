import { BASE_URL } from "../../app/const";
import { album, photo } from "../../app/testData";
import { setupApiStore } from "../../app/testUtils";
import { albumApiSlice } from "./albumSlice";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("fetchAlbums", () => {
  const storeRef = setupApiStore(albumApiSlice);
  fetchMock.mockResponse(JSON.stringify({}));

  test("request is correct", () => {
    return storeRef.store
      .dispatch(albumApiSlice.endpoints.fetchAlbums.initiate(undefined))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0];

        expect(method).toBe("GET");
        expect(url).toBe(`${BASE_URL}/albums`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(albumApiSlice);
    fetchMock.mockResponse(JSON.stringify([album]));

    return storeRef.store
      .dispatch(albumApiSlice.endpoints.fetchAlbums.initiate(undefined))
      .then((action) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe("fulfilled");
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual([album]);
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(albumApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));

    return storeRef.store
      .dispatch(albumApiSlice.endpoints.fetchAlbums.initiate(undefined))
      .then((action) => {
        const {
          status,
          error: { error },
          isError,
        } = action;
        expect(status).toBe("rejected");
        expect(isError).toBe(true);
        expect(error).toBe("Error: Internal Server Error");
      });
  });
});

describe("fetchAlbumPhotos", () => {
  const storeRef = setupApiStore(albumApiSlice);
  fetchMock.mockResponse(JSON.stringify({}));

  test("request is correct", () => {
    return storeRef.store
      .dispatch(albumApiSlice.endpoints.fetchAlbumPhotos.initiate(album.id))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0];

        expect(method).toBe("GET");
        expect(url).toBe(`${BASE_URL}/albums/${album.id}/photos`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(albumApiSlice);
    fetchMock.mockResponse(JSON.stringify([photo]));

    return storeRef.store
      .dispatch(albumApiSlice.endpoints.fetchAlbumPhotos.initiate(album.id))
      .then((action) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe("fulfilled");
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual([photo]);
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(albumApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));

    return storeRef.store
      .dispatch(albumApiSlice.endpoints.fetchAlbumPhotos.initiate(album.id))
      .then((action) => {
        const {
          status,
          error: { error },
          isError,
        } = action;
        expect(status).toBe("rejected");
        expect(isError).toBe(true);
        expect(error).toBe("Error: Internal Server Error");
      });
  });
});
