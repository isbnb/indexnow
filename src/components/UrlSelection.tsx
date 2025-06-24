import React, { useState, useMemo } from 'react';
import { Check, ArrowRight, ArrowLeft, Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ExtractedUrl } from '../App';

interface UrlSelectionProps {
  extractedUrls: ExtractedUrl[];
  setExtractedUrls: (urls: ExtractedUrl[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const UrlSelection: React.FC<UrlSelectionProps> = ({
  extractedUrls,
  setExtractedUrls,
  onNext,
  onBack
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const filteredUrls = useMemo(() => {
    if (!searchTerm) return extractedUrls;
    return extractedUrls.filter(urlObj =>
      urlObj.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [extractedUrls, searchTerm]);

  const selectedCount = extractedUrls.filter(url => url.selected).length;
  const maxSelectable = 100;
  const canSelectMore = selectedCount < maxSelectable;

  const toggleUrl = (index: number) => {
    const originalIndex = extractedUrls.findIndex(url => url.url === filteredUrls[index].url);
    const updatedUrls = [...extractedUrls];
    
    if (!updatedUrls[originalIndex].selected && !canSelectMore) {
      return; // Don't allow selection if at limit
    }
    
    updatedUrls[originalIndex].selected = !updatedUrls[originalIndex].selected;
    setExtractedUrls(updatedUrls);
  };

  const toggleSelectAll = () => {
    const updatedUrls = [...extractedUrls];
    
    if (selectAll) {
      // Deselect all
      updatedUrls.forEach(url => url.selected = false);
    } else {
      // Select up to 100 URLs
      let selectedSoFar = 0;
      updatedUrls.forEach(url => {
        if (selectedSoFar < maxSelectable) {
          url.selected = true;
          selectedSoFar++;
        } else {
          url.selected = false;
        }
      });
    }
    
    setExtractedUrls(updatedUrls);
    setSelectAll(!selectAll);
  };

  const handleContinue = () => {
    if (selectedCount > 0) {
      onNext();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Select URLs to Submit</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Choose up to {maxSelectable} URLs from your sitemap to submit to search engines via IndexNow.
          </p>
        </div>

        {/* Selection Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span className="font-medium text-blue-900 text-sm sm:text-base">
                {selectedCount} of {maxSelectable} URLs selected
              </span>
            </div>
            <div className="text-xs sm:text-sm text-blue-700">
              {extractedUrls.length} total URLs available
            </div>
          </div>
          
          {selectedCount >= maxSelectable && (
            <div className="mt-2 flex items-center text-amber-800 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
              Maximum selection limit reached
            </div>
          )}
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
          
          <button
            onClick={toggleSelectAll}
            disabled={!canSelectMore && !selectAll}
            className="px-4 py-2 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
          >
            {selectAll ? 'Deselect All' : `Select ${Math.min(maxSelectable, filteredUrls.length)}`}
          </button>
        </div>

        {/* URL List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className="max-h-64 sm:max-h-96 overflow-y-auto">
            {filteredUrls.length === 0 ? (
              <div className="p-6 sm:p-8 text-center text-gray-500">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-sm sm:text-base">No URLs match your search criteria.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredUrls.map((urlObj, index) => {
                  const isSelected = urlObj.selected;
                  const canSelect = canSelectMore || isSelected;
                  
                  return (
                    <div
                      key={urlObj.url}
                      className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors duration-200 ${
                        !canSelect && !isSelected ? 'opacity-50' : ''
                      }`}
                    >
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleUrl(index)}
                          disabled={!canSelect}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 flex-shrink-0"
                        />
                        <div className="ml-3 flex-1 min-w-0">
                          <div className={`text-xs sm:text-sm break-all ${
                            isSelected ? 'text-blue-900 font-medium' : 'text-gray-700'
                          }`}>
                            {urlObj.url}
                          </div>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 text-sm sm:text-base"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={selectedCount === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Continue with {selectedCount} URLs
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlSelection;