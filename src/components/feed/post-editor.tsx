'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import CharacterCount from '@tiptap/extension-character-count'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { ImageIcon, ListIcon, AtSignIcon, XIcon, HashIcon, BoldIcon, ItalicIcon, UnderlineIcon, HighlighterIcon, TypeIcon } from 'lucide-react'
import { cn } from "../../lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { useAuth } from '../../contexts/auth-context'

const fontFamilies = [
  { label: 'Default', value: 'Inter' },
  { label: 'Serif', value: 'Georgia' },
  { label: 'Mono', value: 'MonoSpace' },
  { label: 'Comic', value: 'Comic Sans MS' },
]

const colors = [
  '#000000',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
]

interface PostEditorProps {
  onSubmit: (data: { title: string; content: string; images: string[] }) => void
  isLoading:boolean
  clearContent:boolean
}

export default function PostEditor({ onSubmit,isLoading,clearContent }: PostEditorProps) {
  const [title, setTitle] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [charCount, setCharCount] = useState(0)
  const {user}=useAuth();
  const MAX_CHARS = 2000
  const editor = useEditor({
    immediatelyRender:false,
    extensions: [
      StarterKit,
      Image,
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      FontFamily,
      CharacterCount.configure({
        limit: MAX_CHARS
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-invert min-h-[50px] w-full focus:outline-none'
      }
    },
    onUpdate: ({ editor }) => {
      setCharCount(editor.storage.characterCount?.characters() ?? 0)
    }
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setImages([...images, imageUrl])
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (editor) {
      onSubmit({
        title,
        content: editor.getHTML(),
        images
      })
       // Reset fields if not loading
    if (clearContent) {
      console.log(clearContent)
        setTitle('');
        setImages([]);
        editor.commands.clearContent(); // Clear the editor content
        setCharCount(0); // Reset character count
      }
    }
  }

  const addEmoji = (emoji: any) => {
    if (editor) {
      editor.commands.insertContent(emoji.native)
    }
  }

  return (
    <div className="w-full  border  mx-auto  rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <HashIcon size={16} />
            show
          </Button>
          <Button 
            onClick={handleSubmit}
            className={`bg-green-600 hover:bg-green-700 ${isLoading?'cursor-wait':'cursor-pointer'}`}
          >
           {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </div>

      <Input
        type="text"
        placeholder="What are you working on...."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-transparent border-none text-lg px-0  placeholder:text-zinc-500"
      />

      {editor && (
        <BubbleMenu editor={editor} className="bg-zinc-800 p-1 rounded-lg shadow-lg flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(editor.isActive('bold') && 'bg-zinc-700')}
          >
            <BoldIcon size={14} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(editor.isActive('italic') && 'bg-zinc-700')}
          >
            <ItalicIcon size={14} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={cn(editor.isActive('highlight') && 'bg-zinc-700')}
          >
            <HighlighterIcon size={14} />
          </Button>
          <Select
            onValueChange={(value) => editor.chain().focus().setFontFamily(value).run()}
          >
            <SelectTrigger className="h-8 w-[100px]">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => editor.chain().focus().setColor(value).run()}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color }} 
                    />
                    <span>Color</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img 
                src={img} 
                alt="Uploaded content" 
                className="rounded-md w-full h-48 object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XIcon size={16} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <ImageIcon className="h-5 w-5 text-zinc-800 hover:text-zinc-300" />
          </label>
          <ListIcon className="h-5 w-5 text-zinc-400 hover:text-zinc-300" />
          {/* <EmojiPicker onEmojiSelect={addEmoji} /> */}
          <AtSignIcon className="h-5 w-5 text-zinc-400 hover:text-zinc-300" />
        </div>
        <span className={cn(
          "text-sm",
          charCount > MAX_CHARS ? "text-red-500" : "text-zinc-400"
        )}>
          {charCount}/{MAX_CHARS}
        </span>
      </div>
    </div>
  )
}

