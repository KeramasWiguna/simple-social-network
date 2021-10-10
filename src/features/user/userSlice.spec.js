import { BASE_URL } from "../../app/const";
import { user } from "../../app/testData";
import { setupApiStore } from "../../app/testUtils";
import { userApiSlice } from "./userSlice";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("fetchUsers", () => {
  const storeRef = setupApiStore(userApiSlice);
  fetchMock.mockResponse(JSON.stringify({}));

  test("request is correct", () => {
    return storeRef.store
      .dispatch(userApiSlice.endpoints.fetchUsers.initiate(undefined))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0];

        expect(method).toBe("GET");
        expect(url).toBe(`${BASE_URL}/users`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(userApiSlice);
    fetchMock.mockResponse(JSON.stringify([user]));

    return storeRef.store
      .dispatch(userApiSlice.endpoints.fetchUsers.initiate(undefined))
      .then((action) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe("fulfilled");
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual([user]);
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(userApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));

    return storeRef.store
      .dispatch(userApiSlice.endpoints.fetchUsers.initiate(undefined))
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
