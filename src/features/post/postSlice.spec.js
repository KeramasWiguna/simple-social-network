import { BASE_URL } from "../../app/const";
import { post } from "../../app/testData";
import { setupApiStore } from "../../app/testUtils";
import { postApiSlice } from "./postSlice";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("fetchPosts", () => {
  const storeRef = setupApiStore(postApiSlice);
  fetchMock.mockResponse(JSON.stringify({}));

  test("request is correct", () => {
    return storeRef.store
      .dispatch(postApiSlice.endpoints.fetchPosts.initiate(undefined))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0];

        expect(method).toBe("GET");
        expect(url).toBe(`${BASE_URL}/posts`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockResponse(JSON.stringify([post]));

    return storeRef.store
      .dispatch(postApiSlice.endpoints.fetchPosts.initiate(undefined))
      .then((action) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe("fulfilled");
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual([post]);
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));

    return storeRef.store
      .dispatch(postApiSlice.endpoints.fetchPosts.initiate(undefined))
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

describe("createPost", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.createPost.initiate(post))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0];
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(post);
        });
        expect(method).toBe("POST");
        expect(url).toBe(`${BASE_URL}/posts`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockResponse(JSON.stringify(post));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.createPost.initiate(post))
      .then((action) => {
        const { data } = action;
        expect(data).toStrictEqual(post);
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.createPost.initiate(post))
      .then((action) => {
        const {
          error: { error },
        } = action;
        expect(error).toBe("Error: Internal Server Error");
      });
  });
});

describe("patchPost", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.patchPost.initiate(post))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0];
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(post);
        });
        expect(method).toBe("PATCH");
        expect(url).toBe(`${BASE_URL}/posts/${post.id}`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockResponse(JSON.stringify(post));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.patchPost.initiate(post))
      .then((action) => {
        const { data } = action;
        expect(data).toStrictEqual(post);
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.patchPost.initiate(post))
      .then((action) => {
        const {
          error: { error },
        } = action;
        expect(error).toBe("Error: Internal Server Error");
      });
  });
});

describe("removePost", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.removePost.initiate(post.id))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0];
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(post);
        });
        expect(method).toBe("DELETE");
        expect(url).toBe(`${BASE_URL}/posts/${post.id}`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.removePost.initiate(post.id))
      .then((action) => {
        const { data } = action;
        expect(data).toStrictEqual({});
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(postApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));
    return storeRef.store
      .dispatch(postApiSlice.endpoints.removePost.initiate(post.id))
      .then((action) => {
        const {
          error: { error },
        } = action;
        expect(error).toBe("Error: Internal Server Error");
      });
  });
});
