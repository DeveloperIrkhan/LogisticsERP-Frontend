import axios from "axios";
import {
  ApiResponse,
  ItemCategory,
  ItemCreateDto,
  ItemResponseDto,
  ItemStockReportDto,
  ItemUpdateDto,
} from "./types";
import api from "@/lib/axios";

const ITEM_ENDPOINTS = {
  AddItem: "/Item/add-item",
  UpdateItem: "/Item/update-item",
  GetItem: "/Item/get-item",
  GetAllItems: "/Item/get-all-items",
  DeleteItem: "/Item/delete-item",
  GetByCategory: "/Item/get-by-category",
  GetActive: "/Item/get-active",
  GetLowStock: "/Item/get-low-stock",
  StockReport: "/Item/report/stock",
} as const;

export const CreateItemAsync = async (
  dto: ItemCreateDto,
): Promise<ApiResponse<ItemResponseDto>> => {
  var response = await api.post(ITEM_ENDPOINTS.AddItem, dto);
  return response.data;
};

export const updateItemAsync = async (
  id: string,
  dto: ItemUpdateDto,
): Promise<ApiResponse<ItemResponseDto>> => {
  var response = await api.put(`${ITEM_ENDPOINTS.UpdateItem}/${id}`, dto);
  return response.data;
};

export const getItemByIdAsync = async (
  id: string,
): Promise<ApiResponse<ItemResponseDto>> => {
  var response = await api.get(`${ITEM_ENDPOINTS.GetItem}/${id}`);
  return response.data;
};

export const getAllItemsAsync = async (): Promise<
  ApiResponse<ItemResponseDto[]>
> => {
  var response = await api.get(ITEM_ENDPOINTS.GetAllItems);
  return response.data;
};

export const deleteItemAsync = async (
  id: string,
): Promise<ApiResponse<boolean>> => {
  const response = await api.delete(`${ITEM_ENDPOINTS.DeleteItem}/${id}`);
  return response.data;
};

export const getItemsByCategoryAsync = async (
  category: ItemCategory,
): Promise<ApiResponse<ItemResponseDto[]>> => {
  const response = await api.get(ITEM_ENDPOINTS.GetByCategory, {
    params: { category },
  });
  return response.data;
};

export const getActiveItemsAsync = async (): Promise<
  ApiResponse<ItemResponseDto[]>
> => {
  const response = await api.get(ITEM_ENDPOINTS.GetActive);
  return response.data;
};


export const getLowStockItemsAsync = async (): Promise<
  ApiResponse<ItemResponseDto[]>
> => {
  const response = await api.get(ITEM_ENDPOINTS.GetLowStock);
  return response.data;
};


export const getStockReportAsync = async (): Promise<
  ApiResponse<ItemStockReportDto[]>
> => {
  const response = await api.get(ITEM_ENDPOINTS.StockReport);
  return response.data;
};


