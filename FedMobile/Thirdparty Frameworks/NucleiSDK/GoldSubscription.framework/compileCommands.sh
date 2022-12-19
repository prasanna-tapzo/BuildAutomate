protoc gold_messages.proto --swift_out=. --swiftgrpc_out=Client=true,Server=false:.
protoc gold_service.proto --swift_out=. \--swiftgrpc_out=Client=true,Server=true:.
