'use client';

const Skeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Skeleton для Header */}
      <div className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="hidden md:flex space-x-4">
              {['Главная', 'О компании', 'Услуги', 'Проекты', 'Контакты'].map((item, index) => (
                <div key={index} className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="w-32 h-10 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Skeleton для Hero секции */}
      <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="h-12 bg-gray-300 rounded animate-pulse mb-6"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse mb-6 w-4/5"></div>
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-8 w-2/3"></div>
            <div className="h-14 bg-gray-300 rounded-lg animate-pulse w-64"></div>
          </div>
        </div>
      </div>

      {/* Skeleton для остальных секций */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Секция услуг */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="h-8 bg-gray-300 rounded animate-pulse w-64 mx-auto mb-4"></div>
            <div className="h-5 bg-gray-300 rounded animate-pulse w-96 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-sm space-y-4 border border-gray-100">
                <div className="h-12 w-12 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((line) => (
                    <div key={line} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-gray-300 rounded animate-pulse w-3/4"></div>
                    </div>
                  ))}
                </div>
                <div className="h-10 bg-gray-300 rounded-lg animate-pulse mt-4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Секция кейсов */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="h-8 bg-gray-300 rounded animate-pulse w-48 mx-auto mb-4"></div>
            <div className="h-5 bg-gray-300 rounded animate-pulse w-80 mx-auto"></div>
          </div>
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="h-8 bg-gray-600 rounded animate-pulse"></div>
                <div className="h-5 bg-gray-600 rounded animate-pulse w-4/5"></div>
                <div className="h-16 bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="h-64 bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Секция о компании */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="h-8 bg-gray-300 rounded animate-pulse w-56 mx-auto mb-4"></div>
            <div className="h-5 bg-gray-300 rounded animate-pulse w-72 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-sm text-center space-y-4 border border-gray-100">
                <div className="h-16 w-16 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
                <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton для Footer */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gray-600 rounded animate-pulse"></div>
              <div className="w-32 h-4 bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div className="flex space-x-6">
              <div className="w-6 h-6 bg-gray-600 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-600 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;