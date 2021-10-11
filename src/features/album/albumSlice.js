import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const albumApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAlbums: builder.query({
      query: () => "albums",
    }),
    fetchAlbumPhotos: builder.query({
      query: (albumId) => `albums/${albumId}/photos`,
    }),
  }),
});

export const { useFetchAlbumsQuery, useFetchAlbumPhotosQuery } = albumApiSlice;

export const selectAlbumResult = albumApiSlice.endpoints.fetchAlbums.select();
const emptyAlbums = [];

export const selectAllAlbums = createSelector(
  selectAlbumResult,
  (albumResult) => albumResult?.data ?? emptyAlbums
);

export const selectAlbumByUserId = createSelector(
  selectAllAlbums,
  (state, userId) => userId,
  (albums, userId) =>
    albums.filter((album) => album.userId === parseInt(userId))
);

export const selectAlbumById = createSelector(
  selectAllAlbums,
  (state, albumId) => albumId,
  (albums, albumId) => albums.find((album) => album.id === parseInt(albumId))
);
