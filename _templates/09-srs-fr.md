# Đặc tả Yêu cầu Chức năng Chi tiết (Functional Requirements - FR)

---
id: DOC-FR-[MODULE]-001
title: Functional Requirements Specification - [Tên Phân Hệ]
version: 1.0.0
phase: 02-elicit-spec
domain: [Lĩnh Vực]
tags: [srs, fr, functional-spec]
author: [Tên Tác Giả]
last_updated: [YYYY-MM-DD]
---

## 1. Bảng Tổng hợp Yêu cầu Chức năng Phân hệ
| Mã FR | Tên Chức năng | Phân hệ con | Tác nhân kích hoạt | Mức độ ưu tiên | Trạng thái |
| :--- | :--- | :--- | :--- | :---: | :---: |
| `FR-[MODULE]-[FEAT]-001` | [Động từ + Tân ngữ] | [Tên feature] | [Actor chính] | P0 (Must Have) | Sẵn sàng dev |
| `FR-[MODULE]-[FEAT]-002` | [Động từ + Tân ngữ] | [Tên feature] | [Actor chính] | P1 (Should Have) | Sẵn sàng dev |

---

## 2. Đặc tả Chi tiết Từng Yêu cầu Chức năng

### FR-[MODULE]-[FEAT]-001: [Tên Chức năng]
- **Mã định danh**: `FR-[MODULE]-[FEAT]-001`
- **Mức độ ưu tiên**: **P0 (Must Have - MVP)**
- **Tác nhân kích hoạt**: [Vai trò người dùng theo Rule 17]
- **Mô tả hành vi**: [Mô tả mục tiêu người dùng và kết quả đạt được của hệ thống]

#### A. Dữ liệu Đầu vào (Input Specification)
| Tên trường | Tên tham số API | Kiểu dữ liệu | Bắt buộc | Ràng buộc / Validation | Mô tả ý nghĩa |
| :--- | :--- | :---: | :---: | :--- | :--- |
| Email người dùng | `email` | String | Có | Regex RFC 5322, max 255 chars | Email đăng nhập của khách |
| Mật khẩu | `password` | String | Có | Min 8 chars, 1 hoa, 1 số, 1 ký tự đặc biệt | Mật khẩu xác thực |

#### B. Quy trình Xử lý Tuần tự (Processing Logic)
1. **Bước 1 (Sanitization & Validation)**: Kiểm tra định dạng đầu vào; nếu sai trả về lỗi `ERR-[MODULE]-422-01`.
2. **Bước 2 (Business Rule Verification)**: Đối chiếu với quy tắc `BR-[DOMAIN]-001`. Nếu tài khoản đang bị tạm khóa theo `BR-SEC-002` $ightarrow$ Từ chối và trả về `ERR-AUTH-403-02`.
3. **Bước 3 (Authentication & Hashing)**: So khớp mật khẩu đã băm bằng Argon2id; nếu sai tăng số lần đếm thất bại `failed_attempts += 1`.
4. **Bước 4 (Session Issuance)**: Nếu đúng, reset `failed_attempts = 0`, sinh cặp JWT Tokens (Access Token TTL 15 phút, Refresh Token TTL 7 ngày).
5. **Bước 5 (Audit Logging)**: Ghi log lịch sử đăng nhập vào bảng `audit_logs` (IP, User-Agent, Timestamp).

#### C. Dữ liệu Đầu ra (Output Specification)
- **Mã phản hồi HTTP**: `200 OK`
- **Response Payload**: Trả về thông tin user cơ bản và JWT Tokens theo chuẩn Envelope (Rule 10).
- **Mã lỗi phát sinh**: `ERR-AUTH-401-01` (Sai thông tin), `ERR-AUTH-403-02` (Tài khoản bị khóa).
