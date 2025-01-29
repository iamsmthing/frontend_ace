"use client"

import { useState } from 'react'
import { Input } from "../../components/ui/input"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator
} from "../../components/ui/select"

export default function SearchAndFilter() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
      <Input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow"
      />
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending Review</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

