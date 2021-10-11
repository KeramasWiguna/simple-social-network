import { BASE_URL } from "../../app/const";
import { comment } from "../../app/testData";
import { setupApiStore } from "../../app/testUtils";
import { commentApiSlice } from "./commentSlice";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("createComment", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.createComment.initiate(comment))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0];
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(comment);
        });
        expect(method).toBe("POST");
        expect(url).toBe(`${BASE_URL}/comments`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockResponse(JSON.stringify(comment));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.createComment.initiate(comment))
      .then((action) => {
        const { data } = action;
        expect(data).toStrictEqual(comment);
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.createComment.initiate(comment))
      .then((action) => {
        const {
          error: { error },
        } = action;
        expect(error).toBe("Error: Internal Server Error");
      });
  });
});

describe("patchComment", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.patchComment.initiate(comment))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0];
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(comment);
        });
        expect(method).toBe("PATCH");
        expect(url).toBe(`${BASE_URL}/comments/${comment.id}`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockResponse(JSON.stringify(comment));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.patchComment.initiate(comment))
      .then((action) => {
        const { data } = action;
        expect(data).toStrictEqual(comment);
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.patchComment.initiate(comment))
      .then((action) => {
        const {
          error: { error },
        } = action;
        expect(error).toBe("Error: Internal Server Error");
      });
  });
});

describe("removeComment", () => {
  test("request is correct", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.removeComment.initiate(comment.id))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0];
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(comment);
        });
        expect(method).toBe("DELETE");
        expect(url).toBe(`${BASE_URL}/comments/${comment.id}`);
      });
  });

  test("successful response", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.removeComment.initiate(comment.id))
      .then((action) => {
        const { data } = action;
        expect(data).toStrictEqual({});
      });
  });

  test("unsuccessful response", () => {
    const storeRef = setupApiStore(commentApiSlice);
    fetchMock.mockReject(new Error("Internal Server Error"));
    return storeRef.store
      .dispatch(commentApiSlice.endpoints.removeComment.initiate(comment.id))
      .then((action) => {
        const {
          error: { error },
        } = action;
        expect(error).toBe("Error: Internal Server Error");
      });
  });
});
