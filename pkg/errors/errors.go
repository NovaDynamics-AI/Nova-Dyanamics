package errors

import (
	"fmt"
	"runtime"
)

type Error struct {
	Code    string
	Message string
	Cause   error
	Stack   []string
}

func New(code string, message string) *Error {
	return &Error{
		Code:    code,
		Message: message,
		Stack:   captureStack(),
	}
}

func Wrap(err error, code string, message string) *Error {
	return &Error{
		Code:    code,
		Message: message,
		Cause:   err,
		Stack:   captureStack(),
	}
}

func captureStack() []string {
	stack := make([]uintptr, 32)
	length := runtime.Callers(2, stack[:])
	frames := runtime.CallersFrames(stack[:length])

	var trace []string
	for {
		frame, more := frames.Next()
		trace = append(trace, fmt.Sprintf("%s:%d", frame.Function, frame.Line))
		if !more {
			break
		}
	}

	return trace
}
