package hu.bme.mit.smartmobility.gdgbmewebsite.Repository;

import hu.bme.mit.smartmobility.gdgbmewebsite.Model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByQrCodeKey(String qrCodeKey);

    Optional<Event> findByExternalGdgEventId(String externalGdgEventId);

    @Query("""
        SELECT e FROM Event e
        WHERE e.externalGdgEventId IS NOT NULL
          AND e.status != hu.bme.mit.smartmobility.gdgbmewebsite.Model.Event.EventStatus.CANCELED
        ORDER BY e.eventDate DESC
        """)
    List<Event> findAllSyncable();

    /** Upcoming events sorted by date ascending (nearest first). */
    @Query("""
        SELECT e FROM Event e
        WHERE e.eventDate >= :from
          AND e.status NOT IN (hu.bme.mit.smartmobility.gdgbmewebsite.Model.Event.EventStatus.CANCELED)
        ORDER BY e.eventDate ASC
        """)
    List<Event> findUpcoming(@Param("from") LocalDateTime from);

    /** All events in a given month (for calendar view). */
    @Query("""
        SELECT e FROM Event e
        WHERE YEAR(e.eventDate)  = :year
          AND MONTH(e.eventDate) = :month
        ORDER BY e.eventDate ASC
        """)
    List<Event> findByYearAndMonth(@Param("year") int year, @Param("month") int month);

    Page<Event> findByStatus(Event.EventStatus status, Pageable pageable);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.event.id = :eventId")
    long countAttendees(@Param("eventId") Long eventId);
}
