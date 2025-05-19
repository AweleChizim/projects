#include <iostream>
#include <stack>
#include <list>
#include <queue>
#include <deque>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

deque<int>eventScheduleManagerById;
deque<string>eventScheduleManagerByName;
vector<int>scheduler;
stack<int>unDo;
stack<int>reDo;
int eventIdNo = 1000;

struct Participant {
    int key;
    string data1, data2, data3, data4, data5;
    
    Participant(int participantId, string firstName, string lastName, string email, string course, string level) {
        key = participantId;
        data1 = firstName;
        data2 = lastName;
        data3 = email;
        data4 = course;
        data5 = level;
    }
};
struct Event {
    int key, data4, data5;
    string data1, data2, data3;
    Event* left;
    Event* right;
    list<Participant*> participantList;
    queue<int>participantCheckInManager;
    queue<int>grantedAccessCount;

    Event(int eventId, string eventName, string category, string venue, int impLvl, int urgLvl) {
        key = eventId;
        data1 = eventName;
        data2 = category;
        data3 = venue;
        data4 = impLvl;
        data5 = urgLvl;
        left = nullptr;
        right = nullptr;
        
    }
};

class eventManagerTree {
    public:
        Event* root;                      
        eventManagerTree() {
            root = nullptr;
        }
        
        void create(int eventId, string eventName, string category, string venue, int impLvl, int urgLvl) {
            root = insertEvent(root, eventId, eventName, category, venue, impLvl, urgLvl);
        }

        void idSearch(int eventId) {
            cout << endl;
            searchEventById(root, eventId);
            cout << endl;
        }

        void nameSearch(string eventName) {
            cout << endl;
            searchEventByName(root, eventName);
            cout << endl;
        }

        void idEdit(int eventId, string newEventName, string newCategory, string newvenue) {
            cout << endl;
            editEventById(root, eventId, newEventName, newCategory, newvenue);
            cout << endl;
        }

        void idDelete(int eventId) {
            cout << endl;
            root = deleteEventById(root, eventId);
        }

        void idAddParticipant(int eventId, Participant* participantDetails) {
            cout << endl;
            addParticipantToListByEventId(root, eventId, participantDetails);
            cout << endl;
        }

        void idCheckInParticipant(int eventId, int participantId) {
            cout << endl;
            checkInParticipantByEventId(root, eventId, participantId);
            cout << endl;
        }

        void idProcessParticipantCheckIn(int eventId) {
            cout << endl;
            processParticipantCheckInByEventId(root, eventId);
            cout << endl;
        }

        void idViewNextParticipant(int eventId) {
            cout << endl;
            viewNextParticipantInLineByEventId(root, eventId);
            cout << endl;
        }

        void displayReport() {
            cout << endl;
            displayEventTree(root);
            cout << endl;
        }

    private:
        Event* insertEvent(Event* event, int eventId, string eventName, string category, string venue, int impLvl, int urgLvl) {
            if (event == nullptr) {
                cout << "Event with ID no " << eventId << " has been created\n\n";
                return new Event(eventId, eventName, category, venue, impLvl, urgLvl);
            } 
            if (eventId < event->key) {
                event->left = insertEvent(event->left, eventId, eventName, category, venue, impLvl, urgLvl);
            } else {
                event->right = insertEvent(event->right, eventId, eventName, category, venue, impLvl, urgLvl);
            } 
            
            return event;
        }

        Event* searchEventById(Event* event, int eventId) {
            if (event == nullptr){
                cout << "Event with ID no " << eventId << " Not Found.\n";
            } else {
                if (event->key == eventId) {
                    cout << "EVENT ID: " << event->key << "\nEVENT NAME: " << event->data1 << "\nCATEGORY: " 
                    << event->data2 << "\nVENUE: " << event->data3;
                    cout << "\nPARTICIPANTS:\n";
                    int sn = 1;
                    for (const auto& participantDetails : event->participantList){
                        cout << "Participant "<<sn<<"\nID No." << participantDetails->key <<"\nName: " 
                        << participantDetails->data1 <<" "<< participantDetails->data2 << "\nEmail: " 
                        << participantDetails->data3 <<"\nClass: "<< participantDetails->data5 <<"Level "
                        << participantDetails->data4 <<"\n\n";
                        sn+=1;
                    }
                    int i = 1;
                    for (const auto& idNo : eventScheduleManagerById){ //determine event's position in the event schedule
                        if (idNo == event->key){
                            cout << "Event Schedule: Position "<<i<<" out of "<<eventScheduleManagerById.size()<<".\n";
                        }
                        i+=1;
                    }
                } else if (event->key < eventId) {
                    searchEventById(event->right, eventId);
                } else {
                    searchEventById(event->left, eventId);
                }
            }
            return event;
        }

        Event* searchEventByName(Event* event, string eventName) {
            if (event == nullptr){
                cout << "Event with name " << eventName << " Not Found.\n";
            } else {
                if (event->data1 == eventName) {
                    cout << "EVENT ID: " << event->key << "\nEVENT NAME: " << event->data1 << "\nCATEGORY: " 
                    << event->data2 << "\nVENUE: " << event->data3;
                    cout << "\nPARTICIPANTS:\n";
                    int sn = 1;
                    for (const auto& participantDetails : event->participantList){
                        cout << "Participant "<<sn<<"\nID No." << participantDetails->key <<"\nName: " 
                        << participantDetails->data1 <<" "<< participantDetails->data2 << "\nEmail: " 
                        << participantDetails->data3 <<"\nClass: "<< participantDetails->data5 <<"Level "
                        << participantDetails->data4 <<"\n\n";
                        sn+=1;
                    }
                    int i = 1;
                    for (const auto& name : eventScheduleManagerByName){ //determine event's position in the event schedule
                        if (name == eventName){
                            cout << "The " <<eventName<< " event is in position "<<i<<" out of "
                            <<eventScheduleManagerByName.size()<<" on the event schedule.\n";
                        }
                        i+=1;
                    }
                } else if (event->data1 < eventName) {
                    searchEventByName(event->right, eventName);
                } else {
                    searchEventByName(event->left, eventName);
                }
            }
            return event;
        }

        Event* editEventById(Event* event, int eventId, string newEventName, string newCategory, string newVenue) {
            if (event == nullptr){
                cout << "Event with ID no " << eventId << " Not Found.\n";
            } else {
                if (event->key == eventId) {
                    cout << "Old Event Details\nEVENT ID: " << event->key << "\nEVENT NAME: " << event->data1 << "\nCATEGORY: " << event->data2 << "\nVENUE: " << event->data3 << "\n\n";
                    event->data1 = newEventName;
                    event->data2 = newCategory;
                    event->data3 = newVenue;
                    cout << "Event with ID No."<< eventId <<" has been edited successfully.\n\n" <<endl;
                    cout << "New Event Details\nEVENT ID: " << event->key << "\nEVENT NAME: " 
                    << event->data1 << "\nCATEGORY: " << event->data2 << "\nVENUE: " << event->data3 << "\n\n";
                } else if (event->key < eventId) {
                    editEventById(event->right, eventId, newEventName, newCategory, newVenue);
                } else {
                    editEventById(event->left, eventId, newEventName, newCategory, newVenue);
                }
            }
            return event;
        }

        Event* findNextEvent(Event* event) {
            event = event->right;
            while (event != nullptr && event->left != nullptr){
                event = event->left;
            }
            return event;
        }

        Event* deleteEventById(Event* event, int eventId) {
            if (event == nullptr){
                cout << "Event with ID no " << eventId << " Not Found.\n";
                return event;
            } else {
                if (event->key > eventId) { //finding the event
                    event->left = deleteEventById(event->left, eventId); 
                } else if (event->key < eventId) { //finding the event
                    event->right = deleteEventById(event->right, eventId);
                } else if (event->key == eventId) { //event found; if event has 0 or 1 child
                    if (event->left == nullptr) {
                        Event* hold = event->right;
                        int index;
                        int i=0;
                        for (const auto& idNo : eventScheduleManagerById){ //determine event's position in the event schedule
                            i+=1;
                            if (idNo == event->key){
                                index = i;
                            }
                        }
                        auto indexID = eventScheduleManagerById.begin();
                        advance(indexID, index-1);
                        eventScheduleManagerById.erase(indexID); 
                        auto indexName = eventScheduleManagerByName.begin();
                        advance(indexName, index-1);
                        eventScheduleManagerByName.erase(indexName);                        
                        delete event;
                        //event->data1.erase();
                        cout << "Event with ID No."<< eventId <<" has been deleted successfully.\n" <<endl;
                        return hold;
                    } else if (event->right == nullptr) {
                        Event* hold = event->left;
                        int index;
                        int i=0;
                        for (const auto& idNo : eventScheduleManagerById){ //determine event's position in the event schedule
                            i+=1;
                            if (idNo == event->key){
                                index = i;
                            }
                        }
                        auto indexID = eventScheduleManagerById.begin();
                        advance(indexID, index-1);
                        eventScheduleManagerById.erase(indexID); 
                        auto indexName = eventScheduleManagerByName.begin();
                        advance(indexName, index-1);
                        eventScheduleManagerByName.erase(indexName);                        
                        delete event;
                        cout << "Event with ID No."<< eventId <<" has been deleted successfully.\n" <<endl;
                        return hold;
                    }
                    Event* nextEvent = findNextEvent(event);
                    event->key = nextEvent->key;
                    event->data1 = nextEvent->data1;
                    event->data2 = nextEvent->data2;
                    event->data3 = nextEvent->data3;
                    event->data4 = nextEvent->data4;
                    event->data5 = nextEvent->data5;
                    event->participantList = nextEvent->participantList;
                    event->participantCheckInManager = nextEvent->participantCheckInManager;
                    event->grantedAccessCount = nextEvent->grantedAccessCount;
                    event->right = deleteEventById(event->right, nextEvent->key);
                }
            }
            return event;
        }

        Event* addParticipantToListByEventId(Event* event, int eventId,  Participant* participantDetails) {
            if (event == nullptr){
                cout << "Event with ID no " << eventId << " Not Found.\n";
            } else {
                if (event->key == eventId) {
                    event->participantList.push_back(participantDetails);
                    cout << "Participant with ID No."<< participantDetails->key <<
                    " has registered for Event with ID No." << eventId <<" successfully.\n" <<endl;
                } else if (event->key < eventId) {
                    addParticipantToListByEventId(event->right, eventId, participantDetails);
                } else {
                    addParticipantToListByEventId(event->left, eventId, participantDetails);
                }
            }
            return event;
        }

        Event* checkInParticipantByEventId(Event* event, int eventId, int participantId) {
            if (event == nullptr){
                cout << "Event with ID no " << eventId << " Not Found.\n";
            } else {
                if (event->key == eventId) {
                    int count = 0;
                    for (const auto& participantDetails : event->participantList){
                        if (participantDetails->key == participantId) {
                            count+=1;
                        }                    
                    }
                    if (count < 1) {
                        cout << "Participant Not Found!\nPlease register for event before checking in.\n";
                        return NULL;
                    } else {
                        event->participantCheckInManager.push(participantId);
                        cout << "Participant with ID No."<< participantId <<" has been checked in to Event with ID No." << eventId <<" successfully.\n" <<endl;
                    }
                } else if (event->key < eventId) {
                    checkInParticipantByEventId(event->right, eventId, participantId);
                } else {
                    checkInParticipantByEventId(event->left, eventId, participantId);
                }
            }
            return event;
        }

        Event* processParticipantCheckInByEventId(Event* event, int eventId) {
            if (event == nullptr){
                cout << "Event with ID no " << eventId << " Not Found.\n";
            } else {
                if (event->key == eventId) {
                    if (event->participantCheckInManager.empty()) {
                        cout << "No participant on the queue!";
                    } else {
                        cout << "Participant with ID No."<< event->participantCheckInManager.front() <<" has been granted access to "<< event->data3 << " for " << event->data1 <<".\n" <<endl;
                        event->grantedAccessCount.push(event->participantCheckInManager.front());
                        event->participantCheckInManager.pop();
                    }
                } else if (event->key < eventId) {
                    processParticipantCheckInByEventId(event->right, eventId);
                } else {
                    processParticipantCheckInByEventId(event->left, eventId);
                }
            }
            return event;
        }

        Event* viewNextParticipantInLineByEventId(Event* event, int eventId) {
            if (event == nullptr){
                cout << "Event with ID no " << eventId << " Not Found.\n";
            } else {
                if (event->key == eventId) {
                    if (event->participantCheckInManager.empty()) {
                        cout << "No participant on the queue!";
                    } else {
                        cout << "Participant with ID No."<< event->participantCheckInManager.front() <<
                        " is the next participant in line for " << event->data1 <<".\n" <<endl;
                    }
                } else if (event->key < eventId) {
                    viewNextParticipantInLineByEventId(event->right, eventId);
                } else {
                    viewNextParticipantInLineByEventId(event->left, eventId);
                }
            }
            return event;
        }        
        int no = 1;
        void displayEventTree(Event* event) {
            if (event == nullptr) {
                return;
            }
            
            displayEventTree(event->left);
            cout << "Event " << no;
            no+=1;
            cout << "\n\nEvent ID: " << event->key << "\nEvent Name: " << event->data1 << "\nCategory: " 
            << event->data2 << "\nVenue: " << event->data3;
            cout << "\nPARTICIPANTS:\n";
            int sn = 0;
            for (const auto& participantDetails : event->participantList){
                sn+=1;
                cout << "Participant "<<sn<<"\nID No." << participantDetails->key <<"\nName: " 
                << participantDetails->data1 <<" "<< participantDetails->data2 << "\nEmail: " 
                << participantDetails->data3 <<"\nClass: "<< participantDetails->data5 <<"Level "
                << participantDetails->data4 <<"\n\n";
            } 
            if (sn == 0){
                cout << "None\n\n";
            }
            int i = 1;
            for (const auto& idNo : eventScheduleManagerById){ //determine event's position in the event schedule
                if (idNo == event->key){
                    cout << "Event Schedule: Position "<<i<<" out of "<<eventScheduleManagerById.size()<<".\n";
                }
                i+=1;
            }
            cout << "\nCheck-In Statistics\nNo of people that have checked in: " 
            << event->participantCheckInManager.size() << "\nNo of people that have been granted access: "
            << event->grantedAccessCount.size();
            cout << "\n\n\n";
            displayEventTree(event->right);
        }
};
eventManagerTree events;

int scheduleEvent(int idNo, string eventName, int implvl, int urglvl){
    //creating an event schedule using a priority queue
    //using user inputs(importance and urgency level) to determine an event's position in the schedule
    int schedule = (implvl + urglvl) / 2;
    if (scheduler.empty()){
        eventScheduleManagerById.push_front(idNo);
        eventScheduleManagerByName.push_front(eventName);
    } else {
        if (schedule >= scheduler.back()){
            eventScheduleManagerById.push_front(idNo);
            eventScheduleManagerByName.push_front(eventName);
        } else if (schedule < scheduler.back()){
            eventScheduleManagerById.push_back(idNo);
            eventScheduleManagerByName.push_back(eventName);
        }
    }
    scheduler.push_back(schedule);
    return 0;
}

int addEvent() {
    eventIdNo += 1; //generate eventId
    int categoryInput, importanceLevel, urgencyLevel;
    string category, eventName, venue;
    
    //collect event details
    try { 
        cout << "Select event category: \n";
        cout << "Enter 1 for Seminars/Workshops\n      2 for Sports\n      3 for Competitions\n      4 for Others\n";
        cin >> categoryInput;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        } 
        cin.ignore();
        if (categoryInput == 1) {
            category = "Seminars/Workshops";
        } else if (categoryInput == 2) {
            category = "Sports";
        } else if (categoryInput == 3) {
            category = "Competitions";
        } else if (categoryInput == 4) {
            category = "Others";
        } else {
            throw runtime_error("Only digits 1-4 are allowed!");
        }    
        cout << "Enter the name of the event: ";
        getline(cin, eventName);
        cin.ignore();
        transform(eventName.begin(), eventName.end(), eventName.begin(), ::toupper); 
        cout << "Enter the venue of the event: ";
        getline(cin, venue);
        cin.ignore();
        cout << "Enter the event's level of importance (0-5): ";
        cin >> importanceLevel;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if ((importanceLevel < 0) || (importanceLevel > 5)) {
            throw runtime_error("Only digits 0-5 are allowed!");
        }
        cout << "Enter the event's level of urgency (0-5): ";
        cin >> urgencyLevel;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if ((urgencyLevel < 0) || (urgencyLevel > 5)) {
            throw runtime_error("Only digits 0-5 are allowed!");
        }
        
        events.create(eventIdNo, eventName, category, venue, importanceLevel, urgencyLevel);
        scheduleEvent(eventIdNo, eventName, importanceLevel, urgencyLevel);
    }  
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }      
        
    return 0;
}

int viewEvent() {
    int input, eventId;
    string eventName;

    try {
        cout << "Please enter 1 to search by id\n          or 2 to search by name\n";
        cin >> input;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (input == 1) {
            cout << "Enter the event's id: ";
            cin >> eventId; //collect eventId
            if (cin.fail()) { 
                cin.clear(); 
                cin.ignore(); 
                throw invalid_argument("Expected an integer."); 
            }
            cin.ignore();
            events.idSearch(eventId); //search for event
        } else if (input == 2) {
            cout << "Enter the event's name: ";
            getline(cin, eventName); //collect eventName
            cin.ignore();
            transform(eventName.begin(), eventName.end(), eventName.begin(), ::toupper); 
            events.nameSearch(eventName); //search for event
        } else {
            throw runtime_error("Expected either integer 1 or 2");   
        }
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    return 0;
}

int editEvent() {
    int eventId, categoryInput;
    string category, eventName, venue;

    try {
        cout << "Enter the event's id: ";
        cin >> eventId; //collect eventId
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        //collect new event details
        cout << "Enter New Event Details\nSelect event category: \n";
        cout << "Enter 1 for Seminars/Workshops\n      2 for Sports\n      3 for Competitions\n      4 for Others\n";
        cin >> categoryInput;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (categoryInput == 1) {
            category = "Seminars/Workshops";
        } else if (categoryInput == 2) {
            category = "Sports";
        } else if (categoryInput == 3) {
            category = "Competitions";
        } else if (categoryInput == 4) {
            category = "Others";
        } else {
            throw runtime_error("Only digits 1-4 are allowed!");
        }
        cout << "Enter the name of the event: ";
        getline(cin, eventName);
        cin.ignore();
        transform(eventName.begin(), eventName.end(), eventName.begin(), ::toupper); 
        cout << "Enter the venue of the event: ";
        getline(cin, venue);
        cin.ignore();
        
        //allow user undo or redo creating an event using a stack
        int input1;
        unDo.push(eventId);
        cout << "Enter 0 to proceed or 1 to undo action: ";
        cin >> input1;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (input1 == 0) {
            events.idEdit(unDo.top(), eventName, category, venue);
            unDo.pop();
        } else if (input1 == 1) {
            unDo.pop();
            cout << "Action successfully undone!\n";
            int input2;
            reDo.push(eventId);
            cout << "Enter 0 to proceed or 1 to redo action: ";
            cin >> input2;
            if (cin.fail()) { 
                cin.clear(); 
                cin.ignore(); 
                throw invalid_argument("Expected an integer."); 
            }
            cin.ignore();
            if (input2 == 0) {
                reDo.pop();
            } else if (input2 == 1) {
                events.idEdit(reDo.top(), eventName, category, venue);
                reDo.pop();
            } else {
                throw runtime_error("Expected either integer 0 or 1");
            } 
        } else {
            throw runtime_error("Expected either integer 0 or 1");
        }    
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    
    return 0;
}

int deleteEvent() {
    int eventId;    
    try {    
        cout << "Enter the event's id: ";
        cin >> eventId; //collect eventId
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        events.idDelete(eventId);
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    return 0;
}

int registerParticipant() {
    int eventId, participantId;
    string firstName, lastName, email, course, level;
    
    try {
        cout << "Enter the event's id: "; //collect eventId
        cin >> eventId;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        //collect participant details
        cout << "Participant ID(first 2 & last 4 digits of your matric no): ";
        cin >> participantId;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        cout << "First Name: ";
        getline(cin, firstName);
        cin.ignore();
        cout << "Surname: ";
        getline(cin, lastName);
        cin.ignore();
        cout << "Email: ";
        getline(cin, email);
        cin.ignore();
        transform(email.begin(), email.end(), email.begin(), ::tolower); 
        cout << "Course: ";
        getline(cin, course);
        cin.ignore();
        cout << "Level: ";
        getline(cin, level);
        cin.ignore();
        //allow user undo or redo registering a participant using a stack
    
        int input1;
        unDo.push(participantId);
        cout << "Enter 0 to proceed or 1 to undo action: ";
        cin >> input1;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (input1 == 0) {
            Participant* participant = new Participant(participantId, firstName, lastName, email, course, level);
            events.idAddParticipant(eventId, participant);
            unDo.pop();
        } else if (input1 == 1) {
            unDo.pop();
            cout << "Action successfully undone!\n";
            int input2;
            reDo.push(participantId);
            cout << "Enter 0 to proceed or 1 to redo action: ";
            cin >> input2;
            if (cin.fail()) { 
                cin.clear(); 
                cin.ignore(); 
                throw invalid_argument("Expected an integer."); 
            }
            cin.ignore();
            if (input2 == 0) {
                reDo.pop();
            } else if (input2 == 1) {
                Participant* participant = new Participant(participantId, firstName, lastName, email, course, level);
                events.idAddParticipant(eventId, participant);
                reDo.pop();
            } else {
                throw runtime_error("Expected either integer 0 or 1");
            } 
        } else {
            throw runtime_error("Expected either integer 0 or 1");
        }    
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 

    return 0;
}

int checkInParticipant() {
    int eventId, participantId;
    cout << "Enter the event's id: "; //collect eventId
    try {    
        cin >> eventId; //collect eventId
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        cout << "Participant ID(first 2 & last 4 digits of your matric no): "; //collect participantId
        cin >> participantId;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        events.idCheckInParticipant(eventId, participantId);  //confirm participant registerd for event and if yes add participant to the queue using participantId
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
       
    return 0;
}

int processParticipantCheckIn() {
    int input, eventId;
    cout << "Enter the event's id: ";
    try {    
        cin >> eventId; //collect eventId
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        cout << "Please enter 1 to process a participant\n          or 2 to view the next participant in line\n";
        cin >> input;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if (input == 1) {
            events.idProcessParticipantCheckIn(eventId); //process participant by dequeueing the first in the list
        } else if (input == 2) {
            events.idViewNextParticipant(eventId); //view next participant in line to be let in
        } else {
            throw runtime_error("Expected either integer 1 or 2");
        }    
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    
    return 0;
}

int displayReport() {
    cout << "EVENT REPORT DETAILS\n";
    events.displayReport();
    return 0;
}

int menu() {
    int input1;
    cout << "Please enter 1 to create a new event.\n";
    cout << "       enter 2 to search for an event.\n";
    cout << "       enter 3 to edit an existing event.\n";
    cout << "       enter 4 to delete an existing event.\n";
    cout << "       enter 5 to register for an event.\n";
    cout << "       enter 6 to check-in to an event.\n";
    cout << "       enter 7 to process check-in to an event.\n";
    cout << "       enter 8 to display report.\n";
    cout << "       enter 9 to return to main menu.\n";
    try {    
        cin >> input1;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if ((input1 < 1) || (input1 > 9)) {
            throw runtime_error("Please enter an integer from 1-9.");
        }
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
    return input1;
}

int mainMenu() {
    int input1;
    try {
        cout << "Please enter 1 to view menu.\n";
        cout << "       enter 2 to exit program\n";
        cin >> input1;
        if (cin.fail()) { 
            cin.clear(); 
            cin.ignore(); 
            throw invalid_argument("Expected an integer."); 
        }
        cin.ignore();
        if ((input1 < 1) || (input1 > 9)) {
            throw runtime_error("Please enter either 1 or 2.");
        }
    } 
    catch (const runtime_error& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    } 
    catch (const invalid_argument& error) {
        cout << "INVALID INPUT: " << error.what() <<endl;
        return 0;
    }
       
    return input1;    
}

int main() {
    cout << "                 Welcome to AGC Events Management                  ";
    cout << "\n                                      Developed by AGC Developers\n\n";

    int menuKey;
    int mainMenuKey = mainMenu();
    while (mainMenuKey != 2) {
        if (mainMenuKey == 1) { 
            menuKey = menu();
            if (menuKey == 1) { 
                addEvent();
            } else if (menuKey == 2) { 
                viewEvent();
            } else if (menuKey == 3) { 
                editEvent();
            } else if (menuKey == 4) { 
                deleteEvent();
            } else if (menuKey == 5) { 
                registerParticipant(); 
            } else if (menuKey == 6) { 
                checkInParticipant();
            } else if (menuKey == 7) { 
                processParticipantCheckIn();
            } else if (menuKey == 8) { 
                displayReport();
            } else if (menuKey == 9) { 
                cout <<"\n";
            }
        }
        mainMenuKey = mainMenu();
    }
    cout << "Thank you for using AGC Events Management!"<<endl;
    return 0;
}