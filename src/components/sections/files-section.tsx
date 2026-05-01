'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, ImageIcon, Video, FileText, Link2, Mic,
  Download, Trash2, Share2, Grid3X3, List,
  Search, FolderOpen, HardDrive, ChevronDown,
  X, Check
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { mockFiles } from '@/lib/mock-data'
import { formatRelativeTime, formatFileSize, cn } from '@/lib/utils'
import type { FileItem } from '@/types'

type FileTab = 'all' | 'images' | 'videos' | 'documents' | 'links' | 'voice'
type SortOption = 'newest' | 'oldest' | 'largest' | 'smallest' | 'name'
type ViewMode = 'grid' | 'list'

export default function FilesSection() {
  const [activeTab, setActiveTab] = useState<FileTab>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  const filteredFiles = useMemo(() => {
    let files = [...mockFiles]

    // Filter by tab
    if (activeTab !== 'all') {
      const typeMap: Record<string, string[]> = {
        images: ['image'],
        videos: ['video'],
        documents: ['document', 'archive'],
        links: [],
        voice: ['audio'],
      }
      files = files.filter(f => typeMap[activeTab]?.includes(f.type))
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      files = files.filter(f => f.name.toLowerCase().includes(q))
    }

    // Sort
    const sorted = [...files]
    switch (sortBy) {
      case 'newest': sorted.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()); break
      case 'oldest': sorted.sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()); break
      case 'largest': sorted.sort((a, b) => b.size - a.size); break
      case 'smallest': sorted.sort((a, b) => a.size - b.size); break
      case 'name': sorted.sort((a, b) => a.name.localeCompare(b.name)); break
    }

    return sorted
  }, [activeTab, sortBy, searchQuery])

  const storageUsed = 2.4
  const storageTotal = 5
  const storagePercent = (storageUsed / storageTotal) * 100

  const storageBreakdown = [
    { label: 'ImageIcons', size: 1.2, color: 'bg-honey', icon: ImageIcon },
    { label: 'Videos', size: 0.8, color: 'bg-blue-400', icon: Video },
    { label: 'Documents', size: 0.3, color: 'bg-green-400', icon: FileText },
    { label: 'Other', size: 0.1, color: 'bg-purple-400', icon: FolderOpen },
  ]

  const toggleSelect = (id: string) => {
    setSelectedFiles(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if (selectedFiles.size === filteredFiles.length) {
      setSelectedFiles(new Set())
    } else {
      setSelectedFiles(new Set(filteredFiles.map(f => f.id)))
    }
  }

  const clearSelection = () => {
    setSelectedFiles(new Set())
    setIsSelectMode(false)
  }

  const deleteSelected = () => {
    // Mock delete
    clearSelection()
  }

  const getFileIcon = (type: string) => {
    if (type === 'image') return ImageIcon
    if (type === 'video') return Video
    if (type === 'audio') return Mic
    return FileText
  }

  const getFileTypeBadge = (type: string) => {
    if (type === 'image') return 'IMG'
    if (type === 'video') return 'MP4'
    if (type === 'audio') return 'VOX'
    if (type === 'document') return 'DOC'
    if (type === 'archive') return 'ZIP'
    return 'FILE'
  }

  const getFileColor = (type: string) => {
    if (type === 'image') return 'from-honey/30 to-amber-700/30'
    if (type === 'video') return 'from-blue-400/30 to-blue-700/30'
    if (type === 'audio') return 'from-purple-400/30 to-purple-700/30'
    if (type === 'document') return 'from-green-400/30 to-green-700/30'
    return 'from-gray-400/30 to-gray-600/30'
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 glass-premium p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Files & Media</h2>
          <div className="flex items-center gap-2">
            {isSelectMode ? (
              <>
                <Button size="sm" variant="ghost" onClick={selectAll} className="text-xs rounded-full">
                  {selectedFiles.size === filteredFiles.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button size="sm" variant="destructive" onClick={deleteSelected} disabled={selectedFiles.size === 0} className="text-xs rounded-full">
                  <Trash2 className="w-3 h-3 mr-1" /> Delete ({selectedFiles.size})
                </Button>
                <Button size="sm" variant="ghost" onClick={clearSelection} className="text-xs rounded-full">
                  <X className="w-3 h-3" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsSelectMode(true)}
                  className="text-xs rounded-full"
                >
                  Select
                </Button>
                <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="rounded-full bg-honey text-background hover:bg-honey/90 text-xs">
                      <Upload className="w-3 h-3 mr-1" /> Upload
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-gradient-honey">Upload File</DialogTitle>
                    </DialogHeader>
                    <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-honey/50 transition-colors cursor-pointer">
                      <Upload className="w-10 h-10 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag & drop files here</p>
                      <p className="text-xs text-muted-foreground">or click to browse</p>
                      <Button size="sm" className="rounded-full bg-honey/20 text-honey text-xs mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>

        {/* Storage Usage */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <HardDrive className="w-3 h-3" /> {storageUsed} GB / {storageTotal} GB
            </span>
            <span className="text-[10px] text-muted-foreground">{Math.round(storagePercent)}%</span>
          </div>
          <Progress value={storagePercent} className="h-1.5" />
          <div className="flex items-center gap-3 mt-2">
            {storageBreakdown.map(item => (
              <div key={item.label} className="flex items-center gap-1">
                <div className={cn('w-2 h-2 rounded-full', item.color)} />
                <span className="text-[9px] text-muted-foreground">{item.label} {item.size} GB</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="pl-8 h-8 text-xs glass-card border-border/50 rounded-xl"
            />
          </div>
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="h-8 text-xs rounded-xl"
            >
              Sort <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-1 w-32 glass-card rounded-xl border border-border p-1 z-30">
                {(['newest', 'oldest', 'largest', 'smallest', 'name'] as SortOption[]).map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSortMenu(false) }}
                    className={cn(
                      'w-full text-left px-3 py-1.5 text-xs rounded-lg capitalize transition-colors',
                      sortBy === opt ? 'bg-honey/20 text-honey' : 'hover:bg-accent/30'
                    )}
                  >
                    {opt === sortBy && <Check className="w-3 h-3 inline mr-1" />}
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex glass-card rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={cn('p-1.5 rounded-md transition-colors', viewMode === 'grid' ? 'bg-honey/20 text-honey' : 'text-muted-foreground')}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn('p-1.5 rounded-md transition-colors', viewMode === 'list' ? 'bg-honey/20 text-honey' : 'text-muted-foreground')}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FileTab)}>
          <TabsList className="glass-card w-full h-9 rounded-xl">
            {(['all', 'images', 'videos', 'documents', 'links', 'voice'] as const).map(tab => (
              <TabsTrigger key={tab} value={tab} className="text-[10px] rounded-lg capitalize data-[state=active]:bg-honey/20 data-[state=active]:text-honey">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Files Content */}
      <div className="p-4">
        {filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-sm text-muted-foreground">No files found</p>
            <p className="text-xs text-muted-foreground mt-1">Upload or change filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {filteredFiles.map(file => {
              const isImageIcon = file.type.startsWith('image')
              const isSelected = selectedFiles.has(file.id)
              return (
                <motion.div
                  key={file.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => isSelectMode ? toggleSelect(file.id) : setPreviewFile(file)}
                  className={cn(
                    'relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all',
                    isSelected ? 'border-honey shadow-honey' : 'border-transparent'
                  )}
                >
                  {isImageIcon ? (
                    <div className={cn('w-full h-full bg-gradient-to-br', getFileColor(file.type), 'flex items-center justify-center')}>
                      <ImageIcon className="w-6 h-6 text-honey/60" />
                    </div>
                  ) : (
                    <div className={cn('w-full h-full bg-gradient-to-br flex flex-col items-center justify-center gap-1', getFileColor(file.type))}>
                      {(() => { const Icon = getFileIcon(file.type); return <Icon className="w-6 h-6 text-muted-foreground/60" /> })()}
                      <Badge className="text-[8px] px-1 bg-background/50">{getFileTypeBadge(file.type)}</Badge>
                    </div>
                  )}
                  {isSelectMode && (
                    <div className={cn(
                      'absolute top-1 right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                      isSelected ? 'bg-honey border-honey' : 'border-white/50 bg-black/30'
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-background" />}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map(file => {
              const Icon = getFileIcon(file.type)
              const isSelected = selectedFiles.has(file.id)
              return (
                <motion.div
                  key={file.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => isSelectMode ? toggleSelect(file.id) : setPreviewFile(file)}
                  className={cn(
                    'flex items-center gap-3 p-3 glass-card rounded-xl cursor-pointer transition-all',
                    isSelected && 'border-honey shadow-honey'
                  )}
                >
                  <div className={cn('w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0', getFileColor(file.type))}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{getFileTypeBadge(file.type)}</span>
                      <span>{formatFileSize(file.size)}</span>
                      <span>{formatRelativeTime(file.uploadedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-accent/30 transition-colors">
                      <Download className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-accent/30 transition-colors">
                      <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    {isSelectMode && (
                      <div className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center ml-1',
                        isSelected ? 'bg-honey border-honey' : 'border-muted-foreground'
                      )}>
                        {isSelected && <Check className="w-3 h-3 text-background" />}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="glass-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewFile?.name}</DialogTitle>
          </DialogHeader>
          {previewFile && (
            <div className="flex flex-col items-center gap-4">
              <div className={cn(
                'w-full aspect-video rounded-xl bg-gradient-to-br flex items-center justify-center',
                getFileColor(previewFile.type)
              )}>
                {(() => { const Icon = getFileIcon(previewFile.type); return <Icon className="w-16 h-16 text-muted-foreground/40" /> })()}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground w-full">
                <span>{getFileTypeBadge(previewFile.type)}</span>
                <span>{formatFileSize(previewFile.size)}</span>
                <span>{formatRelativeTime(previewFile.uploadedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="rounded-full bg-honey text-background">
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
                <Button size="sm" variant="destructive" className="rounded-full">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
