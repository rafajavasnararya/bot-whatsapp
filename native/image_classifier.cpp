#include <string>
struct ReviewResult{bool inspect;double confidence;std::string note;};
ReviewResult metadata_review(const std::string& mime,long bytes){bool ok=mime=="image/jpeg"||mime=="image/png"||mime=="image/webp";return{!(ok&&bytes<=10485760),0.0,"Metadata check only; authenticity requires human review."};}