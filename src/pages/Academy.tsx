import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Search, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import CourseCard from '../components/CourseCard'
import { motion } from 'framer-motion'

// Updated courses data with SEO-friendly slugs
export const courses = [
  {
    id: '1',
    slug: 'fashion-business-masterclass',
    name: 'Fashion Business Masterclass',
    description: "Master the art of fashion entrepreneurship with our comprehensive Fashion Business Course. Learn to launch and grow your fashion brand in today's competitive market.",
    courseType: 'Virtual',
    consultation: true,
    domain: 'Fashion business',
    startDate: '2024-07-11',
    duration: 8,
    coursePhoto: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '2',
    slug: 'graphic-design-essentials',
    name: 'Graphic Design Essentials',
    description: "Dive into the world of visual communication with our 6-month Graphic Design Course. From branding to UI/UX, master all aspects of modern design.",
    courseType: 'Virtual',
    consultation: false,
    domain: 'Graphic Design',
    startDate: '2024-07-11',
    duration: 24,
    coursePhoto: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '3',
    slug: 'ecommerce-business-fundamentals',
    name: 'E-commerce Business Fundamentals',
    description: "Launch your online store with confidence. Our E-commerce Business Course covers everything from market research to digital marketing strategies.",
    courseType: 'Virtual',
    consultation: true,
    domain: 'E-commerce',
    startDate: '2024-07-12',
    duration: 12,
    coursePhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
]

const Academy: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      (selectedType ? course.courseType === selectedType : true) &&
      course.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  }, [selectedType, debouncedSearchTerm])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50
      }
    }
  }

  const handleCourseClick = (slug: string) => {
    navigate(`/academy/${slug}`)
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-5"
    >
      <div className="container mx-auto px-4 py-8 space-y-8">
        <motion.section 
          className="bg-white shadow-xl rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-0 md:space-x-4 space-y-4 md:space-y-0 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(null)}
                className={`w-full md:w-auto px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedType === null 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {t('All Courses')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType('Virtual')}
                className={`w-full md:w-auto px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedType === 'Virtual'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {t('Virtual Courses')}
              </motion.button>
            </div>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder={t('Search courses...')}
                className="w-full md:w-80 pl-12 pr-10 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">{t('No courses found. Please try a different search.')}</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {filteredCourses.map(course => (
                <motion.div 
                  key={course.id} 
                  variants={itemVariants}
                  onClick={() => handleCourseClick(course.slug)}
                  className="cursor-pointer"
                >
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        <motion.section 
          className="text-center py-12 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl mt-12 text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4">{t('Not sure where to start?')}</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            {t('Take our quick assessment to find the perfect course for your entrepreneurial journey.')}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/assessment"
              className="bg-white text-primary text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center font-semibold shadow-lg hover:shadow-xl"
            >
              {t('Start Assessment')} <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  )
}

export default Academy
