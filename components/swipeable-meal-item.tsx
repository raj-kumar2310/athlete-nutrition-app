import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SwipeableMealItemProps {
  id: string;
  children: React.ReactNode;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function SwipeableMealItem({ id, children, onDelete, onEdit }: SwipeableMealItemProps) {
  const [showActions, setShowActions] = React.useState(false);
  const [action, setAction] = React.useState<'none' | 'delete' | 'edit'>('none');

  const handleConfirm = () => {
    if (action === 'delete') {
      onDelete(id);
    } else if (action === 'edit') {
      onEdit(id);
    }
    setShowActions(false);
    setAction('none');
  };

  const handleCancel = () => {
    setShowActions(false);
    setAction('none');
  };

  return (
    <div className="relative">
      <div className="mb-2 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setAction('edit');
            setShowActions(true);
          }}
        >
          <Pencil className="mr-1 h-4 w-4" /> Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setAction('delete');
            setShowActions(true);
          }}
        >
          <Trash2 className="mr-1 h-4 w-4" /> Delete
        </Button>
      </div>
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-0 flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 z-10"
          >
            {action === 'delete' && (
              <Button variant="destructive" size="sm" onClick={handleConfirm}>
                <Trash2 className="mr-1 h-4 w-4" /> Delete
              </Button>
            )}
            {action === 'edit' && (
              <Button variant="outline" size="sm" onClick={handleConfirm}>
                <Pencil className="mr-1 h-4 w-4" /> Edit
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ x: showActions ? (action === 'delete' ? -80 : 80) : 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-white dark:bg-gray-900 rounded-md shadow-sm"
      >
        {children}
      </motion.div>
    </div>
  );
}
