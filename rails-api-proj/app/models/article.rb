class Article < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true

  # methods

  def summary
    content.truncate(10) if content.present?
  end
end
