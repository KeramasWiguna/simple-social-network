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
