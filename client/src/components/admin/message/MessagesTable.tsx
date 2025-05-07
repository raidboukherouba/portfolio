import { IoTrashBinOutline } from "react-icons/io5";
import { Message } from '../../../services/messageService';
import { FaCheck, FaEnvelope } from "react-icons/fa";

interface MessagesTableProps {
  messages: Message[];
  onDeleteClick: (id: string, name: string) => void;
  onMarkAsRead: (id: string) => void;
}

const MessagesTable = ({ messages, onDeleteClick, onMarkAsRead }: MessagesTableProps) => {
  return (
    <div className="bg-white dark:bg-black overflow-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Status</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Name</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Email</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Message</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase">Date</th>
            <th className="p-2 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-black dark:divide-gray-700">
          {messages.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-2 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No messages found
              </td>
            </tr>
          ) : (
            messages.map(message => (
              <tr key={message._id} className={message.read ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-black'}>
                <td className="p-1 whitespace-nowrap">
                  <button
                    onClick={() => !message.read && onMarkAsRead(message._id!)}
                    className={`p-1 rounded-full ${message.read ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'}`}
                    title={message.read ? 'Mark as unread' : 'Mark as read'}
                    disabled={message.read}
                  >
                    {message.read ? <FaCheck /> : <FaEnvelope />}
                  </button>
                </td>
                <td className="p-1 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {message.name}
                </td>
                <td className="p-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <a href={`mailto:${message.email}`} className="hover:text-blue-500">
                    {message.email}
                  </a>
                </td>
                <td className="p-1 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                  {message.message}
                </td>
                <td className="p-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : '—'}
                </td>
                <td className="p-1 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onDeleteClick(message._id!, `message from ${message.name}`)}
                    className='text-gray-700 dark:text-white hover:text-red-500 cursor-pointer'
                    title="Delete message"
                  >
                    <IoTrashBinOutline />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesTable;