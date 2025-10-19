FROM golang:1.24.4-alpine

RUN apk add --no-cache gcc musl-dev sqlite-dev

WORKDIR /app
COPY . .

ENV CGO_ENABLED=1

RUN go mod tidy
RUN go build -o server .

EXPOSE 8080
CMD ["./server"]
