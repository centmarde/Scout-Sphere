"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import DefaultLayout from "@/layout/default"
import theme from "@/theme/theme"
import MaintenanceTabs from "./maintenance/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import HeritagePreservationForm from "./maintenance/input"

// Define the type for heritage services
interface HeritageService {
  id: number
  title: string
  description: string
  image: string
}

// Number of cards per page - showing all 6 cards
const CARDS_PER_PAGE = 6

export default function HeritageMaintenancePage() {
  return (
    <DefaultLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold mb-6" style={{ color: theme.colors.primary }}>
          Heritage Services Management
        </h1>
        <MaintenanceTabs 
          heritageMaintenanceComponent={<HeritageMaintenanceCards />}
          addHeritageComponent={<HeritagePreservationForm />}
        />
      </div>
    </DefaultLayout>
  )
}

function HeritageMaintenanceCards() {
  const [heritageServices, setHeritageServices] = useState<HeritageService[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { colors } = theme

  useEffect(() => {
    const fetchHeritageData = async () => {
      try {
        const response = await axios.get('/data/heritage.json')
        setHeritageServices(response.data)
      } catch (error) {
        console.error('Error fetching heritage data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeritageData()
  }, [])

  const totalPages = Math.ceil(heritageServices.length / CARDS_PER_PAGE)
  
  // Calculate the current cards to display based on pagination
  const indexOfLastCard = currentPage * CARDS_PER_PAGE
  const indexOfFirstCard = indexOfLastCard - CARDS_PER_PAGE
  const currentCards = heritageServices.slice(indexOfFirstCard, indexOfLastCard)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading heritage services...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCards.map((service) => (
          <Card key={service.id} className="flex flex-col h-full" style={{ 
            backgroundColor: colors.background,
            borderColor: colors.tertiary,
            boxShadow: `0 4px 8px rgba(76, 88, 91, 0.1)`,
          }}>
            <div className="relative w-full h-48">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="object-cover rounded-t-lg absolute inset-0 w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle style={{ color: colors.primary }}>{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm" style={{ color: colors.mutedText }}>
                {service.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full" style={{
                backgroundColor: colors.secondary,
                color: colors.background,
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = colors.tertiary;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = colors.secondary;
              }}>
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Always show pagination regardless of page count */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              style={{ color: colors.primary }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                onClick={() => setCurrentPage(index + 1)} 
                isActive={currentPage === index + 1}
                style={{ 
                  color: currentPage === index + 1 ? colors.background : colors.primary,
                  backgroundColor: currentPage === index + 1 ? colors.primary : 'transparent',
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              style={{ color: colors.primary }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
