import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketconnection } from '../utils/socket'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

function Chat() {
  const { targetUserId } = useParams()

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const user = useSelector((store) => store.user)
  const userId = user?._id

  const messagesEndRef = useRef(null)

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, {
      withCredentials: true,
    })

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      }
    })
    setMessages(chatMessages)
  }

  useEffect(() => {
    fetchChatMessages()
  }, [])

  useEffect(() => {
    if (!userId || !targetUserId) return

    const socket = createSocketconnection()

    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    })

    socket.on('messageRecieved', ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }])
    })

    return () => socket.disconnect()
  }, [userId, targetUserId, user?.firstName])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const socket = createSocketconnection()
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    })
    setNewMessage("")
  }

  if (!user) return null

  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-3xl h-[75vh] flex flex-col 
                      border border-indigo-300 rounded-2xl shadow-lg bg-white">

        {/* Header */}
        <div className="px-6 py-4 border-b bg-indigo-50 rounded-t-2xl">
          <h1 className="text-lg font-semibold text-indigo-800">
            Chat
          </h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg, index) => {
            const isMe = msg.firstName === user.firstName

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow
                    ${isMe
                      ? "bg-indigo-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                >
                  {!isMe && (
                    <p className="text-xs font-semibold text-indigo-600 mb-1">
                      {msg.firstName} {msg.lastName}
                    </p>
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50 rounded-b-2xl flex gap-3">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary px-6" onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>
    </div>
  )
}

export default Chat